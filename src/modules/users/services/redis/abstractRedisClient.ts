
export abstract class AbstractRedisClient {
  private tokenExpiryTime: number = 604800;
  protected client

  constructor(client) {
    this.client = client;
  }

  public async count(key: string): Promise<number> {
    const allKeys = await this.getAllKeys(key);
    return allKeys.length;
  }

  public exists(key: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      return this.count(key)
        .then((count) => {
          return resolve(count >= 1 ? true : false);
        })
        .catch((err) => {
          return reject(err);
        });
    });
  }

  public getOne<T>(key: string): Promise<T> {
    return new Promise((resolve, reject) => {
      this.client.get(key).then((val) => {
        if (val) return resolve(<T>val);
        else return reject('Error');
      });
    });
  }

  public getAllKeys(wildcard: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.client
        .keys(wildcard)
        .then((results) => {
          if (results) {
            return resolve(results);
          } else {
            return reject('Error');
          }
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  public getAllKeyValue(wildcard: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.client
        .keys(wildcard)
        .then(async (results: string[]) => {
          const allResults = await Promise.all(
            results.map(async (key) => {
              const value = await this.getOne(key);
              return { key, value };
            })
          );
          return resolve(allResults);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  public set(key: string, value: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client
        .set(key, value)
        .then((reply) => {
          this.client
            .expire(key, this.tokenExpiryTime)
            .then(() => resolve(reply))
            .catch((error) => reject(error));
        })
        .catch((error) => reject(error));
    });
  }

  public deleteOne(key: string): Promise<number> {
    return new Promise((resolve, reject) => {
      this.client
        .del(key)
        .then((reply) => resolve(reply))
        .catch((error) => reject(error));
    });
  }

  public testConnection(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client
        .set('test', 'connected')
        .then(() => resolve(true))
        .catch((error) => reject(error));
    });
  }
}

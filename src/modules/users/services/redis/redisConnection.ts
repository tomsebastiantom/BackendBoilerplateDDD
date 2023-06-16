import { RedisClientOptions } from 'redis';
import { createClient } from 'redis';
import { authConfig, isProduction } from '../../../../config';
import { Redis } from 'ioredis';
// const port = authConfig.redisServerPort;
// const host = authConfig.redisServerURL;

// const host = "localhost";
// const port = "6379";
// const url = `redis://${host}:${port}`
class DummyRedis {
  constructor(options?) {
    // this.options = options;
  }

  get(key, callback) {
    console.log(`Getting key ${key}`);
    callback(null, "dummyValue");
  }

  set(key, value, callback) {
    console.log(`Setting key ${key} to ${value}`);
    callback(null, "OK");
  }

  // ... implement other methods as needed
}
// const redisConnection = isProduction
//   ? createClient(authConfig.redisConnectionString as RedisClientOptions )
//   :createClient({connect_timeout: 50000,url:url}  as RedisClientOptions);

// redisConnection.on('connect', () => {
//   console.log(`[Redis]: Connected to redis server at ${host}:${port}`)
// });
// // redisConnection.quit();
// redisConnection.connect();
// const redisConnection = new Redis({
//   host: 'localhost',
//   port: 6379,
// });
authConfig.redisConnectionString = authConfig.redisConnectionString || 'redis://localhost:6379';
const redisConnection = new Redis({
  host: 'localhost',
  port: 6379,
});
export { redisConnection };

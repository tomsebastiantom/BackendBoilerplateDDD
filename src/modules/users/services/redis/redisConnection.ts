
import { RedisClientOptions } from 'redis';
import { createClient } from 'redis';
import { authConfig, isProduction } from '../../../../config';

const port = authConfig.redisServerPort;
const host = authConfig.redisServerURL;
const url = `redis://${host}:${port}`

const redisConnection = isProduction 
  ? createClient(authConfig.redisConnectionString as RedisClientOptions ) 
  :createClient({url}  as RedisClientOptions);


redisConnection.on('connect', () => {
  console.log(`[Redis]: Connected to redis server at ${host}:${port}`)
});

redisConnection.connect();

export { redisConnection }

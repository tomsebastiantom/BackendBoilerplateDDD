
import redis, { RedisClientOptions } from 'redis';

import { authConfig, isProduction } from '../../../../config';

const port = authConfig.redisServerPort;
const host = authConfig.redisServerURL;
const redisConnection = isProduction 
  ? redis.createClient(authConfig.redisConnectionString as RedisClientOptions) 
  : redis.createClient({
    socket: {
        host: host,
        port: (port) as number
    },
      password: 'redis123'
}); // creates a new client

redisConnection.on('connect', () => {
  console.log(`[Redis]: Connected to redis server at ${host}:${port}`)
});

export { redisConnection }

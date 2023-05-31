
import { redisConnection } from "./redis/redisConnection";
import { RedisAuthService } from "./redis/redisAuthService";
import { RedisClientType } from "redis";


const authService = new RedisAuthService(
  redisConnection as RedisClientType
)
// const databaseService = new DatabaseService(authService);


export { authService }
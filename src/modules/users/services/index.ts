
import { redisConnection } from "./redis/redisConnection";
import { RedisAuthService } from "./redis/redisAuthService";
import { RedisClientType } from "redis";

const authService = new RedisAuthService(
  redisConnection as RedisClientType
)

// authService.getTokens('khalilstemmler@gmail.com')
// .then((t) => console.log(t))
// .catch((err) => console.log(err))

export { authService }
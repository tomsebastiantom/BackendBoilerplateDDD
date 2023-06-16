
const authConfig = {
  secret: process.env.NEXA_APP_SECRET,
  tokenExpiryTime: 3000, // seconds => 5 minutes
  redisServerPort: process.env.NEXA_REDIS_PORT || 6379,
  redisServerURL: process.env.NEXA_REDIS_URL,
  redisConnectionString: process.env.NEXA_REDIS_PROD_URL
}

export { authConfig }
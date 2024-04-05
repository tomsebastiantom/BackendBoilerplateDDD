
const authConfig = {
  secret: process.env.APP_SECRET,
  tokenExpiryTime: 3000, // seconds => 5 minutes
  redisServerPort: process.env.REDIS_PORT || 6379,
  redisServerURL: process.env.REDIS_URL,
  redisConnectionString: process.env.REDIS_PROD_URL
}

export { authConfig }
const config = require('config');
const { createClient } = require('redis');

const redisClient = createClient({
  url: process.env.REDIS_URL || config.get('redis.url'),
});

redisClient.on('error', (err) => console.error('Redis error:', err));

(async () => {
  await redisClient.connect();
  console.log('Connected to Redis');
})();

module.exports = redisClient;

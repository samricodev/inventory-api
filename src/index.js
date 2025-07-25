const config = require('config');
const app = require('./app');
const server = require('./server');
const createClient = require('redis').createClient;

const redisClient = createClient({
  url: config.get('redisUrl')
});

redisClient.on('error', (err) => {
  console.error('Redis Client Error', err);
});

const startRedisClient = async () => {
  try {
    await redisClient.connect();
    console.log('Redis client connected successfully');
    server.start(app, config.get('server.port'));
  } catch (error) {
    console.error('Error connecting to Redis:', error);
  }
};

startRedisClient();
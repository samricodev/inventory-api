const axios = require('axios')
const redis = require('redis')
const express = require('express')
const ItemRouter = require('./routes/item')
const connection = require('./db/connection')
const responseTime = require('response-time')
const CategoryRouter = require('./routes/category')

const app = express()
const PORT = process.env.PORT || 3000

app.use(responseTime());

const redisClient = redis.createClient({
  url: "redis://cache:6379",  // 
});

redisClient.on('error', err => console.log('Redis Client Error', err));

app.get('/with-redis', async (req, res) => {
  try {
    const getResultRedis = await redisClient.get('rockets');

    if (getResultRedis) {
      console.log('Use cached data');
      return res.json({ data: JSON.parse(getResultRedis) });
    }

    const response = await axios.get('https://api.spacexdata.com/v4/rockets');
    const saveResultRedis = await redisClient.set('rockets', JSON.stringify(response.data))
    console.log('New data cached ', saveResultRedis);
    return res.json({ data: response.data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get('/without-redis', async (req, res) => {
  try {
    const response = await axios.get('https://api.spacexdata.com/v4/rockets');
    return res.json({ data: response.data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});


redisClient.connect().then(() => {
  console.log("Redis connected")
  app.listen(PORT, () => {
    console.log(` 😀 server on port ${PORT}  `);
  });
});

// connection()

// app.use(express.json())
// app.use('/items', ItemRouter)
// app.use('/categories', CategoryRouter)

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Server listening on port http://localhost:${port}`)
// })
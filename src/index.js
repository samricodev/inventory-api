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

app.use(express.json())
app.use('/items', ItemRouter)
app.use('/categories', CategoryRouter)

app.get('/ping', (req, res) => {
  res.send('pong')
})

redisClient.connect().then(() => {
  console.log("Redis connected")
  app.listen(PORT, () => {
    console.log(` 😀 server on port ${PORT}  `);
  });
});

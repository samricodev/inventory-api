const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const config = require('config');

const connection = require('./db/connection');

const ItemRouter = require('./routes/item');
const CategoryRouter = require('./routes/category');

const app = express();

connection();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors(config.get('cors')));
app.use(express.json());
app.use('/items', ItemRouter);
app.use('/categories', CategoryRouter);

app.get('/ping', (req, res) => {
  console.log('Ping received');
  res.send('pong');
})

module.exports = app;
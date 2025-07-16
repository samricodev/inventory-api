const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const config = require('config');
const i18n = require('./config/i18n');

const connection = require('./db/connection');
const router = require('./routes/router');

const app = express();

connection();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors(config.get('cors')));
app.use(express.json());
app.use(i18n);

app.use('/', router);
app.get('/ping', (req, res) => {
  console.log('Ping received');
  res.send('pong');
})

module.exports = app;
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const logs = require('./api/log');

const middlewares = require('./middleware');

const app = express();

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
});

app.use(morgan('common'));
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN
}));

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World!'
  })
});

app.get('/api/logs', logs);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const PORT = process.env.PORT || 1234

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
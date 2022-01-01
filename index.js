require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const morgan = require('morgan');
const localNewsRoutes = require('./routes/localNewsRoutes');
const foreignNewsRoutes = require('./routes/foreignNewsRoutes');
const weatherRoutes = require('./routes/weatherRoutes');
const pawnedRoutes = require('./routes/pawnedRoutes');
const quotesRoutes = require('./routes/quotesRoutes');
const wordsRoutes = require('./routes/wordsRoutes');

const app = express();

// ------ config ------

const port = process.env.PORT || 3001;
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};
app.set('json spaces', 2);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// ------ top m/ws ------

app.use(express.json());
app.use(cors(corsOptions));
// app.use(morgan('dev'));

// ------ routes ------

app.use('/local_news', localNewsRoutes);
app.use('/foreign_news', foreignNewsRoutes);
app.use('/weather', weatherRoutes);
app.use('/pawned', pawnedRoutes);
app.use('/quotes', quotesRoutes);
app.use('/words', wordsRoutes);

// ------ error handling ------
app.use((req, res, next) => {
  const error = new Error(404);
  next(error);
});

app.use((err, req, res, next) => {
  if (err.message === '404') {
    res.status(404).json({
      status: 'fail',
      data: 'resource not found',
    });
    return;
  }
  res.status(400).json({ status: 'error', data: 'invalid request' });
  next();
});

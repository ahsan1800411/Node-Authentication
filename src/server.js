require('dotenv').config();
require('express-async-errors');
const express = require('express');
const connectDB = require('./config/db');
const morgan = require('morgan');
const { notFoundMiddleware } = require('./middlewares/not-found');
const { errorMiddleware } = require('./middlewares/errorMiddleware');

const app = express();

app.use(express.json());

app.use(morgan('dev'));

const port = process.env.PORT || 5000;

app.use('/api', require('./routes'));

app.use(notFoundMiddleware);
app.use(errorMiddleware);

connectDB();

app.listen(port, () => console.log(`Server is up and running on port ${port}`));

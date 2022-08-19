const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

const errorHandler = require('./middlewares/error')
const ErrorResponse = require('./utils/errorResponse')
const routes = require('./routes/v1')

const app = express();

//
app.use(helmet());
app.use(cors());
app.use(express.json());


// v1 api routes
app.use('/v1', routes);

app.use((req, res, next) => {
    throw new ErrorResponse(`Route don't exist`, 404)
});

app.use(errorHandler);


module.exports = app;
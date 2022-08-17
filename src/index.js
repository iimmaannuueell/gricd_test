const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

const routes = require('./routes/v1')
const connectDB = require('./config/database')


// Connect to Database
connectDB();

const app = express();

//
app.use(helmet());
app.use(cors());
app.use(express.json());


// v1 api routes
app.use('/v1', routes);


const PORT = process.env.PORT || 3000
const server = app.listen(PORT, console.log(`Server running on port: ${PORT}`));
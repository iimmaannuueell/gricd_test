const ErrorResponse = require('../utils/errorResponse');
const fs = require('fs');
const moment = require('moment');

const errorHandler = (err, req, res, next) => {
    let error = { ...err }

    error.message = err.message;
    
    //Log to console for dev
    console.log('err stack',err.stack)

    // fs.appendFile(`./logs/${moment().format('YYYY-MM-DD')}.txt`, `[${moment().format('MMMM Do YYYY, h:mm:ss a')}] ${req.url} \n ${err.stack} \n \n \n`, (err) => {
    //     if (err) {
    //         throw err;
    //     }
        
    // }); 

    //Mongoose bad object ID
    if(err.name === 'CastError') {
        const message = `ID:${err.value} not found`
        error = new ErrorResponse(message, 404)
    }

    //Mongoose duplicate key
    if(err.code === 11000) {
        const message = `Duplicate field value entered`
        error = new ErrorResponse(message, 400)
    }

    //Mongoose validation error
    if(err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse(message, 400)
    }

    res.status(error.statusCode || 500).json({
        status: false,
        message: error.message || 'Server error',
        data: null
    })
}

module.exports = errorHandler;
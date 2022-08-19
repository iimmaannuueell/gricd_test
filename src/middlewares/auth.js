const jwt = require('jsonwebtoken')
const asyncHandler = require('./async')
const ErrorResponse = require('../utils/errorResponse')
const { User } = require('../models')

exports.protect = asyncHandler(async(req,res,next) => {
    let token;

    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    // Make sure token exists
    if(!token) {
        throw new ErrorResponse('User not authorized', 401)
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        console.log('dec',decoded)

        req.user = await User.findById(decoded.id)

        next()
    } catch (err) {
        throw new ErrorResponse('User not authorized', 401)
    }

});
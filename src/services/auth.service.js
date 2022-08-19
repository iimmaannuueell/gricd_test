const { userService } = require('../services')
const ErrorResponse = require('../utils/errorResponse')


const register = async(data) => {
    const user = await userService.createUser(data)
    return user;
}

const login = async(data) => {
    const user = await userService.getUserByEmail(data.email)
    
    if(!user) {
        throw new ErrorResponse(`Invalid user`, 401)
    }
    if(user.isVerified === false) {
        throw new ErrorResponse('Email not verified', 401)
    }

    if(!await user.matchPassword(data.password)) {
        throw new ErrorResponse('Incorrect username or password', 401)
    }
    
    return user;
}


module.exports= {
    register,
    login,
}

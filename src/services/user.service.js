const { User } = require('../models')
const ErrorResponse = require('../utils/errorResponse')

const getUserById = async(id) => {
    const user = await User.findById(id);
    return user;
}


const getUserByEmail = async(email) => {
    const user = await User.findOne({ email: email }).select('+password');
    return user;
}


const createUser = async(data) => {
    if (await User.isEmailTaken(data.email)) { 
        throw new ErrorResponse(`This email address has already being used`, 400)
    }

    const user = await User.create(data);
    return user;
}


const updateUser = async(user, updateBody) => {
    const getUser = await User.findById(user.id)
    if (updateBody.emaill && await getUser.isEmailTaken(updateBody.email)) { 
        throw new ErrorResponse(`This email address has already being used`, 400)
    } 

    Object.assign(getUser, updateBody);
    await getUser.save()
    return getUser;
}

module.exports = {
    getUserById,
    getUserByEmail,
    createUser,
    updateUser
}
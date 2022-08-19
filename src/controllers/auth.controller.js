const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')
const { userService, authService } = require('../services')
const token = require('../utils/token')

/**
 * User registration
 */
const register = asyncHandler(async(req, res) => {

    const user = await authService.register(req.body)

    res.status(200)
        .json({
            success: true,
            message: 'User created successfully',
            data: user 
        });
});


const login = asyncHandler(async(req, res) => {
    const user = await authService.login(req.body);

    const token = await user.getSignedJwtToken();

    const dataResult = {
        user: user,
        token: token
    }


    res.status(200).json({
        success: true,
        message: 'Login successful',
        data: dataResult
    })
});


const logout = asyncHandler(async(req, res) => {
    const user = await userService.getUserById(req.user.id);
    user.expireJwtToken(req)

    res.status(200)
      .json({
          success: true,
          message: 'Logout successful',
          data: null
      });
});


const getMe = asyncHandler(async(req, res) => {
    const user = await userService.getUserById(req.user.id);
    res.status(200)
      .json({
          success: true,
          message: null,
          data: user
      });
});


module.exports = {
    register,
    login,
    logout,
    getMe,
}


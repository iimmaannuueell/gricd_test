const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')
const { walletService, userService } = require('../services')


/**
 * fund wallet
 */
 const getUserWallet = asyncHandler(async(req, res) => {
    const wallet = await userService.getUserById(req.user._id,)
    res.status(200)
        .json({
            success: true,
            message: null,
            data: wallet 
        });
});

/**
 * Create wallet
 */
const createWallet = asyncHandler(async(req, res) => {
    const wallet = await walletService.createWallet(req.user._id)
    console.log("wallet")
    res.status(200)
        .json({
            success: true,
            message: 'Wallet created successfully',
            data: wallet 
        });
});

/**
 * fund wallet
 */
 const fundWallet = asyncHandler(async(req, res) => {
    const wallet = await walletService.fundWallet(req.user._id,req.body)
    res.status(200)
        .json({
            success: true,
            message: 'Wallet funded successfully',
            data: wallet 
        });
});

/**
 * transfer fund to wallet
 */
 const transferToWallet = asyncHandler(async(req, res) => {
    const wallet = await walletService.transferToWallet(req.user._id,req.body)
    res.status(200)
        .json({
            success: true,
            message: 'Wallet transfer successfully',
            data: wallet 
        });
});


/**
 * withdrawal fund to wallet
 */
 const withdrawFromToWallet = asyncHandler(async(req, res) => {
    const wallet = await walletService.withdrawFromToWallet(req.user._id,req.body)
    res.status(200)
        .json({
            success: true,
            message: 'Wallet withdrawal successfully',
            data: wallet 
        });
});

module.exports = {
    createWallet,
    fundWallet,
    getUserWallet,
    transferToWallet,
    withdrawFromToWallet
}
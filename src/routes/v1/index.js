const express = require('express');
const { protect } = require('../../middlewares/auth')
const {validate} = require('../../middlewares/validate')
const {authController,walletController} = require('../../controllers');
const authValidation = require('../../validations/auth.validation');

const router = express.Router();

router.get('/ping', (req, res) => {
    res.status(200).json({
        status: true,
        message: "pong"
    })
});


router.post('/auth/register', validate(authValidation.register), authController.register)
router.post('/auth/login', validate(authValidation.login), authController.login)

router.post('/user/wallet', protect, walletController.createWallet)
router.post('/user/wallet/fund', protect, walletController.fundWallet)
router.get('/user/wallet', protect, walletController.getUserWallet)
router.post('/user/wallet/transfer', protect, walletController.transferToWallet)
router.post('/user/wallet/withdrawal', protect, walletController.withdrawFromToWallet)

module.exports = router;
const express = require('express');
const {validate} = require('../../middlewares/validate')
const {authController} = require('../../controllers');
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

module.exports = router;
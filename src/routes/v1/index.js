const express = require('express');

const router = express.Router();

router.get('/test', (req, res) => {
    res.status(200).json({
        status: true,
        message: "Test route"
    })
});

module.exports = router;
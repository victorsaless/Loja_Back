const express = require('express');

const router = express.Router();

router.get('/users', (req, res) => {
    console.log('controller')
    return res.json({
        
    });
}) 

module.exports = router;
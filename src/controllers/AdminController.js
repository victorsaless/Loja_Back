const express = require('express');

const router = express.Router();

router.get('/users', (req, res) => {
    console.log(req.userLogged, "teste")
    return res.json({
       user: req.userLogged
    })
}) 

module.exports = router;
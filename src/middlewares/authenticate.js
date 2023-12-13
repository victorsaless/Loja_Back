const jwt = require('jsonwebtoken');
const User = require("../model/User");


const authConfig = require('../config/auth.json')


module.exports = (req, res, next) => {
   
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({
            error: true,
            message: "Token nao fornecido"
        })
    }

    const parts = authHeader.split(" ");

    if(parts.length !== 2){
        return res.status(401).json({
            error: true,
            message: "Tipo de token invalido"
        })
    }


    const [scheme, token] = parts;

    if(scheme.indexOf("Bearer") !== 0){
        return res.status(401).json({
            error: true,
            message: "Token mal formatado"
        })
    }

    return jwt.verify(token, authConfig.secret, async (err, decoded) => {
        if(err){
            return res.status(401).json({
                error: true,
                message: "Token Invalido/expirado"
            })
        }

        const user = await User.findOne({
            _id: decoded.id,
          });
          
           req.userLogged = user;
      
     
        console.log(req.userLogged)

        return next()
    })

    

}
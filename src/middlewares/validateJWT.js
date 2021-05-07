const jwt = require('jsonwebtoken');
const { request, response } = require('express');

const validateJWT  = ( req = request , res = response, next ) => {

    const token = req.header('token');
    if ( !token ){
        return res.status(401).json({
            msg: 'no hay token en la peticion'
        })
    }

    try {
    
      const { uid } =  jwt.verify( token, process.env.SECRETPRIVATEKEY )   

      req.uid = uid
      
      next()

    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: 'token no válido'
        })
    }

};

module.exports= {
    validateJWT
}
const jwt = require('jsonwebtoken');
const { request, response } = require('express');

const User = require('../models/user');


const validateJWT  = async ( req = request , res = response, next ) => {

    const token = req.header('token');
    if ( !token ){
        return res.status(401).json({
            msg: 'no hay token en la peticion'
        })
    }

    try {
    
      const { uid } =  jwt.verify( token, process.env.SECRETPRIVATEKEY )   
      const user = await User.findById( uid );

      // verificar si el usuario esta activo
        
      if( !user ){
          return res.status( 401 ).json({
              msg:"usuario no registrado"
          })
      }

      if( !user.state ){
          return  res.status( 401 ).json({
              msg : 'token no valido'
          })
          
      }

      req.user = user;
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
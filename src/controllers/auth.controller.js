const { response } = require( 'express' )
const User         = require('../models/user');
const bcryptjs     = require( 'bcryptjs' );
const { generateJWT } = require('../helpers/generateJWT');

const authLogin = async ( req, res = response ) => {

    const { email, password } = req.body;

    try {
        // verificar si el email existe
        
        const user = await User.findOne({ email }); 
        
        if( !user ){
            return res.status(400).json({
                msg: 'Usuario o contraseña incorrectos - correo'
            })
        }
        // verificar qu eel usuario exista
        
        if( !user.state ){
            return res.status(400).json({
                msg: 'Usuario no existe'
            })
        }
        
        //verificar la contraseña
        
        const validPassword = bcryptjs.compareSync( password, user.password );

        if( !validPassword ){
            return res.status( 400 ).json({
                msg : 'Usuario o contraseña incorrectas - password'
            })
        }
        
        // generar el jwt
        
        const token = await generateJWT( user.id )


    
        res.status( 200 ).json({
            user,
            token
        })

    } catch (error) {
        console.log(error)
        res.status.apply(500).json({
            msg: "algo anda mal"
        })
    }


};


module.exports = {
     authLogin
}
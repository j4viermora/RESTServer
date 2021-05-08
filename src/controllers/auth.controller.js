const { response } = require( 'express' )
const User         = require('../models/user');
const bcryptjs     = require( 'bcryptjs' );
const { generateJWT } = require('../helpers/generateJWT');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSignIn = async ( req, res = response ) => {

    const { id_token } = req.body;
    
    try {
        
    let { email, name, img } = await googleVerify( id_token );
    // verificar si el correo ya existe en la base de datos
    let user = await User.findOne( { email } );
        console.log(user)
        if(!user){
            //create user
            const data ={
                name,
                email,
                password: '...',
                img,
                google: true
            }
            user = new User(data)
            await user.save()
        }

        if( !user.state ){
            return res.status(404).json({
                msg: 'user no activo '
            })
        }

    const token = await generateJWT( user.id )
    
    const data = {
        user,
        token
    }

    res.json({
        msg: "auth ok google",
        data
    })


   } catch (error) {

       res.status(404).json({
           msg: 'Token de google no valido'
       })


   }
   

}   

module.exports = {
     authLogin,
    googleSignIn
}
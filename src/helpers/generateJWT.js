const jwt = require('jsonwebtoken');

const generateJWT = ( uid = '' ) => {
    return new Promise( ( resolve, reject ) => {
        const payload = { uid };
        jwt.sign( payload, process.env.SECRETPRIVATEKEY, {
            expiresIn: '3h'
        }, ( err, token ) => {
            if(err){
                console.log(err)
                reject('no se pudo generar el token')
            }else{
                resolve(token)
            }
        });
    });
};

module.exports = {
    generateJWT
};
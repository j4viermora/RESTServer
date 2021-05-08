const { response } = require("express")

const adminRole = ( req, res = response , next ) => {

    if( !req.user){
        return res.status( 501 ).json({
            msg: "se quire verificar el role sin validar el token antes"
        })
    }

    const { role, name } = req.user;


    if( role !== "ADMIN_ROLE" ){
        return res.status( 401 ).json({
            msg: `${ name } no tiene privilegios suficientes para eliminar usuarios`
        });
    }

    next()
}

const checkRole = ( ...roles ) => {


    return ( req, res, next ) => {

        if( !req.user){
            return res.status( 501 ).json({
                msg: "se quire verificar el role sin validar el token antes"
            })
        }
        
        if( !roles.includes( req.user.role ) ){
            return res.status(404).json({
                msg: `El servicio require algunos de estos roles ${ roles }`
            })
        }

        console.log(roles)

        next();
    }

};

module.exports = {
    adminRole,
    checkRole
}
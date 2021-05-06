const Role = require('../models/role');
const User   = require( '../models/user' );

const validatorRole = async ( role = '' )=> {
        const existRole = await Role.findOne({ role });
        if( !existRole ){
            throw new Error(`El rol ${ role } no esta registrado en la base de datos`);
        }
     }


const isEmailExist = async ( email = '' ) => {
    const emailCheck = await User.findOne({ email });
    if( emailCheck ){
        throw new Error ( ` El email ${ email } ya esta registrado` )
    }
}

module.exports = {
    validatorRole,
    isEmailExist
}

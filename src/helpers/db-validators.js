const { Category } = require('../models');
const Role = require('../models/role');
const User   = require( '../models/user' );

const validatorRole = async ( role )=> {
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

const UserExistID = async( id ) => {

    const isUserID = await User.findById( id );

    if( !isUserID ){

        throw new Error(`El id ${ id } no existe `)

    }

}

const existCategory = async ( id ) => {

    const categoryDB = await Category.findById( id );

    if( !categoryDB ){
        throw new Error( `La id de categoria ${ id } no existe ` )
    }

};


module.exports = {
    validatorRole,
    isEmailExist,
    UserExistID,
    existCategory
}

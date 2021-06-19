// /users/

const{ Router } = require('express');
const { check } = require('express-validator');

const { validateJWT } = require('../middlewares/validateJWT');


const { 
    userGet, 
    userPost, 
    userPut,
    userDelete, 
    userPatch } = require('../controllers/user.controller');
const { fieldValidate } = require('../middlewares/fieldValidate');
const { validatorRole, isEmailExist, UserExistID } = require('../helpers/db-validators');
const { adminRole, checkRole } = require('../middlewares/validateRole');

const router = Router();

router.get( '/', userGet       )


router.post( '/',[
    check( 'email', 'correo no valido' ).isEmail(),
    check( 'email' ).custom( isEmailExist ),
    check( 'name', 'nombre es obligatorio' ).not().isEmpty(),
    check( 'password', 'password es obligatorio' ).isLength({ min: 6 }),
    check('role').custom( validatorRole ),
    fieldValidate
], userPost)

router.put   ( '/:id',[
    check('id', 'no es un id valido').isMongoId(),
    check( 'id' ).custom( UserExistID ),
    check('role').custom( validatorRole ),
    fieldValidate
], userPut    )




router.delete( '/:id', [
    validateJWT,
    adminRole,
    // checkRole( 'ADMIN_ROLE' ),
    check('id', 'no es un id valido').isMongoId(),
    check( 'id' ).custom( UserExistID ),
    fieldValidate, 
],
userDelete )

module.exports = router
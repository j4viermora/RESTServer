// /users/

const{ Router } = require('express');
const { check } = require('express-validator');

const { 
    userGet, 
    userPost, 
    userPut,
    userDelete, 
    userPatch } = require('../controllers/user.controller');
const { fieldValidate } = require('../middlewares/fieldValidate');
const { validatorRole, isEmailExist, UserExistID } = require('../helpers/db-validators');

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




router.delete( '/:id', 
    check('id', 'no es un id valido').isMongoId(),
    check( 'id' ).custom( UserExistID ),
    fieldValidate, 
userDelete )



router.patch ( '/', userPatch     )


module.exports = router
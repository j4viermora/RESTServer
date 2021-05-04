// /user/

const{ Router } = require('express');
const { check } = require('express-validator');

const { 
    userGet, 
    userPost, 
    userPut,
    userDelete, 
    userPatch } = require('../controllers/user.controller');
const { fieldValidate } = require('../middlewares/fieldValidate')

const router = Router();

router.get   ( '/', userGet       )
router.post  ( '/',[
    check( 'email', 'correo no valido' ).isEmail(),
    check( 'name', 'nombre es obligatorio' ).not().isEmpty(),
    check( 'password', 'password es obligatorio' ).isLength({ min: 6 }),
    check( 'role', 'No es un rol valido' ).isIn([ 'ADMIN_ROLE', 'USER_ROLE' ]),
    fieldValidate
], userPost      )
router.put   ( '/:id', userPut    )
router.delete( '/:id', userDelete )
router.patch ( '/', userPatch     )


module.exports = router
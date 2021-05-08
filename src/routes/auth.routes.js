// api/auth

const { Router } = require( 'express' );
const { check } = require('express-validator');

const { authLogin, googleSignIn } = require('../controllers/auth.controller');
const { fieldValidate } = require('../middlewares/fieldValidate');


const router = Router();

router.post('/login', [
    check( 'email', 'Email es obligatorio' ).isEmail(),
    check( 'password', 'Contraseña es obligatoria' ).not().isEmpty(),
    fieldValidate
] ,authLogin)

router.post( '/google', [
    check( 'id_token', 'El google token es necesario' ).not().isEmpty() ,
    fieldValidate,
], googleSignIn )

module.exports = router;
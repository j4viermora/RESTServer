// api/auth

const { Router } = require( 'express' );
const { check } = require('express-validator');

const { authLogin } = require('../controllers/auth.controller');
const { fieldValidate } = require('../middlewares/fieldValidate');


const router = Router();

router.post('/login', [
    check( 'email', 'Email es obligatorio' ).isEmail(),
    check( 'password', 'Contraseña es obligatoria' ).not().isEmpty(),
    fieldValidate
] ,authLogin)


module.exports = router;
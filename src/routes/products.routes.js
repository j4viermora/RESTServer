const { Router } = require('express');
const { check } = require('express-validator');
const { getProducts, 
        createProduct,
        getProductById,
        updateProduct, 
        deleteProduct } = require('../controllers/products.controller');
const { existProduct } = require('../helpers/db-validators');
const { fieldValidate } = require('../middlewares/fieldValidate');
const { validateJWT } = require('../middlewares/validateJWT');
const { adminRole } = require('../middlewares/validateRole');

// /api/products

const router = Router();

router.get( '/' , getProducts )

router.get( '/:id',[
    check( 'id', 'ID no es valido' ).isMongoId(),
    check( 'id' ).custom( existProduct ),
    fieldValidate
], getProductById )

router.post('/',[
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    fieldValidate,
],  createProduct )

router.put( '/:id', [
    validateJWT,
    check('id', 'Id no es valido').isMongoId(),
    check( 'name', 'El nombre de la categoría es obligatorio' ).not().isEmpty(), 
    check( 'id' ).custom( existProduct ),
    fieldValidate
], updateProduct )

router.delete('/:id', [
    validateJWT,
    adminRole,
    check('id', 'Id no es valido').isMongoId(),
    check( 'id' ).custom( existProduct ),
    fieldValidate
], deleteProduct)

module.exports = router
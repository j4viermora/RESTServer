const { Router } = require('express');
const { check }  = require('express-validator');
const { 
     createCategory,
     getCategories, 
     getCategoryById, 
     updateCategory, 
     deleteCategory } = require('../controllers/categories.controller');
const { existCategory } = require('../helpers/db-validators');
const { fieldValidate } = require('../middlewares/fieldValidate');
const { validateJWT } = require('../middlewares/validateJWT');
const { adminRole } = require('../middlewares/validateRole');


const router = Router();

// url/api/categories //

//obtener categorias y el un acceso publico
router.get('/', getCategories)

//obtener una categoria especifica por id - publica
router.get('/:id',[
    check( 'id', 'No es un id válido' ).isMongoId(),
    check( 'id' ).custom( existCategory ),
    fieldValidate,
],  getCategoryById)
//crear una nueva catagoría (es privado)

router.post('/', [ 
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    fieldValidate
], createCategory )


//actualizar un registro por id
router.put('/:id',[
    validateJWT,
    check( 'name', 'El nombre de la categoría es obligatorio' ).not().isEmpty() , 
    check( 'id' ).custom( existCategory ),
    fieldValidate
], updateCategory)


//Borrar una categoría-solo si es un admin

router.delete('/:id',[
    validateJWT,
    adminRole,
    check( 'id', 'No es un id de mongo' ).isMongoId() ,
    check( 'id' ).custom( existCategory ),
    fieldValidate
], deleteCategory)



module.exports = router
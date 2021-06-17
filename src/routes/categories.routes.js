const { Router } = require('express');
const { check }  = require('express-validator');
const { createCategory } = require('../controllers/categories.controller');

const { fieldValidate } = require('../middlewares/fieldValidate');
const { validateJWT } = require('../middlewares/validateJWT');


const router = Router();

// url/api/categories

//obtener categorias y el un acceso publico

router.get('/', (_, resp) => {
    resp.json({
        msg: 'categoreis online'
    })
})

//obtener una categoria especifica por id - publica
router.get('/:id', ( _, resp ) => {
    resp.json({
        msg: 'get by id'
    })
})
//crear una nueva catagoría (es privado)


router.post('/', [ 
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    fieldValidate
], createCategory )


//actualizar un registro por id
router.put('/:id', (_, resp) => {
    resp.json({
        msg: 'update category'
    })
})
//Borrar una categoría-solo si es un admin
router.delete('/', (_, resp ) => {
    resp.json({
        msg: 'delete category'
    })
})



module.exports = router
// /user/

const{ Router } = require('express');

const { 
    userGet, 
    userPost, 
    userPut,
    userDelete, 
    userPatch } = require('../controllers/user.controller');

const router = Router();

router.get( '/', userGet )
router.post( '/', userPost )
router.put( '/:id', userPut )
router.delete( '/:id', userDelete )
router.patch( '/', userPatch )


module.exports = router
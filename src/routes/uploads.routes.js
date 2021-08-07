// api/auth

const { Router } = require('express');
const { check } = require('express-validator');
const { uploadFile } = require('../controllers/uploads.controller');

const { fieldValidate } = require('../middlewares/fieldValidate');

const router = Router();

router.post('/', [], uploadFile);

module.exports = router;

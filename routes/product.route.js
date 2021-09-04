const express = require('express');

const controller = require('../controllers/product.controller');

const router = express.Router();

router.get('/:page', controller.index);

// router.get('/:page', controller.get);

module.exports = router;
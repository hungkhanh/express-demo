const express = require('express');

const controller = require('../controllers/cart.controller');

const router = express.Router();

router.get('/add/:productId', controller.addToCart);

router.get('/', controller.index);

module.exports = router;
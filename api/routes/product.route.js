const express = require('express');

const controller = require('../controllers/product.controller');

const router = express.Router();

router.get('/', controller.index);

router.get('/:id', controller.getProduct)

router.post('/', controller.create);

router.put('/:id', controller.putProduct);

router.patch('/:id', controller.patchProduct);

router.delete('/:id', controller.deleteProduct);

module.exports = router;
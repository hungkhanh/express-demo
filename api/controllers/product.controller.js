const db = require('../../db');

module.exports.index = function(req, res) {
  
  var products = db.get('products').value();
  res.json(products);
};

module.exports.getProduct = function(req, res, next) {

  var product = db.get('products').find({ id: req.params.id }).value();
  res.json(product);
}

module.exports.create = async function(req, res, next) {
  var product = req.body;
  await db.get('products').push(product).write();
  res.json(product);
};

module.exports.putProduct = async function(req, res, next) {
  var product = req.body;
  product.id = req.params.id;
  
  var resultProduct = db.get('products').find({ id: req.params.id }).value();

  if(!resultProduct) {
    await db.get('products').push(product).write();
  } else {
    await db.get('products').find({ id: req.params.id}).assign({ 
      name: product.name,
      description: product.description,
      price: product.price
    }).write();
  }

  res.json(product);
}

module.exports.patchProduct = async function(req, res, next) {
  var resultProduct = db.get('products').find({ id: req.params.id }).value();
  var product = req.body;
  if(!resultProduct) {
    res.json();
    return;
  }

  await db.get('products').find({ id: req.params.id}).assign({ 
    name: product.name,
    description: product.description,
    price: product.price
  }).write();

  resultProduct = db.get('products').find({ id: req.params.id }).value();
  res.json(resultProduct);
  
};

module.exports.deleteProduct = function(req, res, next) {
  var resultProduct = db.get('products').find({ id: req.params.id }).value();
  db.get('products').remove({ id: req.params.id })
  .write();

  res.json(resultProduct);
};

// TODO Full REST API
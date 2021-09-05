const db = require('../../db');

module.exports.index = function(req, res) {
  
  var products = db.get('products').value();
  res.json(products);
};

module.exports.create = async function(req, res, next) {
  var product = req.body;
  await db.get('products').push(product).write();
  res.json(product);
};

// TODO Full REST API
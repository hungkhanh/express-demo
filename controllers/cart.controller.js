const db = require('../db');

module.exports.index = function(req, res, next) {
  // get sessionId
  var sessionId = req.signedCookies.sessionId;
  var cartProductIdObject = db.get('sessions').find({ id: sessionId}).get('cart').value();
  var cartProductId = Object.keys(cartProductIdObject);
  var cartProductQuantity = Object.values(cartProductIdObject);

  var cartProduct = [];
  cartProductId.forEach(element => {
    var item = db.get('products').find({ id: element}).value();
    cartProduct.push(item);
  });

  res.render('cart/index', {
    products: cartProduct
  });
};

module.exports.addToCart = function(req, res, next) {
    var productId = req.params.productId;
    var sessionId = req.signedCookies.sessionId;

    if(!sessionId) {
      res.redirect('/products/1');
      return;
    }

    var countProduct = db
      .get('sessions')
      .find({ id: sessionId })
      .get('cart.' + productId, 0)
      .value();

    db.get('sessions')
      .find({ id: sessionId})
      .set('cart.' + productId, countProduct + 1)
      .write();

    res.redirect('/products/2');
};  
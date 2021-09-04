const db = require('../db');

module.exports.index = function(req, res) {
  
  var page = parseInt(req.params.page) < 0 ? 1 : parseInt(req.params.page);
  var perPage = 8;
  var start = (page - 1) * perPage;
  var end = page * perPage;
  res.render('products/index', {
    products: db.get('products').value().slice(start, end),
    page: page
  });
};
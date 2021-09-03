module.exports.postCreate = function(req,res,next) {
  var errors = [];
  if(!req.body.name) {
    errors.push("Name is not empty");
  }

  if(!req.body.phone) {
    errors.push("Phone is not empty");
  }

  if(errors.length > 0) {
    res.render('users/create', {
      errors: errors,
      values: req.body
    })
    return;
  }
  next();
}
var express = require("express");
var router = express.Router();
var session = require('express-session');
var bodyParser = require('body-parser');
var expressValidator = require ('express-validator');
router.get('/', function(req, res){
  res.render('account', {
      title: 'scanner',
      // headScript: '<script src="/public/scripts/form.js"></script>',
      headStyle: '<link rel="stylesheet" href="/public/stylesheet/styles.css">',
      success:fasle,
      errors: req.session.errors
  });
  req.session.errors = null;
});

router.post('/', function(req, res, next){
  req.check('email', 'Invalid email address').isEmail();
  req.check('password', "password is invalid").isLength({min:6}).equals(req.bady.repeat-password);
  var errors = req.validationErrors();
  if(errors) {
    req.session.errors= errors;
  }
  res.redirect('/');
});




module.exports = router;

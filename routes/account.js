var express = require("express");
var router = express.Router();

router.get('/', function(req, res){
  res.render('account', {
      title: 'scanner',
      // headScript: '<script src="/public/scripts/form.js"></script>',
      headStyle: '<link rel="stylesheet" href="/public/stylesheet/styles.css">',
      success: false,
      errors: req.session.errors
  });
  req.session.errors = null;
});

router.post('/', function(req, res, next){
  console.log(req.body);
  req.check('email', 'Invalid email address').isEmail();
  req.check('password', "password is minimun 6 characters").isLength({min:6}).equals(req.body['repeat-password']);
  var errors = req.validationErrors();
  if(errors) {
    console.log(errors);
    res.locals.registerErrors = errors;

    for (var i=0; i<errors.length; i++) {
      if (errors[i].param === 'password') {
        res.locals.passwordError = errors[i].msg;
      }
      if (errors[i].param === 'email') {
        res.locals.emailError = errors[i].msg;
      }
    }
    res.render('account', {
      headStyle: '<link rel="stylesheet" href="/public/stylesheet/styles.css">',
    });
  } else {
    req.session.user = true;
    req.session.cookie.maxAge = 60000;
    req.cookies.username = `{req.body['first-name']} {req.body['last-name']}`
    res.redirect(302, '/');
  }

});




module.exports = router;

var express = require("express");
var router = express.Router();
var session = require('express-session');

router.get('/', function(req, res){
  res.render('account', {
      title: 'scanner',
      // headScript: '<script src="/public/scripts/form.js"></script>',
      headStyle: '<link rel="stylesheet" href="/public/stylesheet/styles.css">'
  });
});






module.exports = router;

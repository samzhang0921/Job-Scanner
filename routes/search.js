var express = require("express");
var router = express.Router();
var urlUtils = require('../middleware/urlUtils.js');
var fetchUrl = require('../middleware/fetchUrl.js');
var scanRender = require('../controller/scanRender.js');

router.get('/', function(req, res){
    if(res.locals.itemJobs && res.locals.itemJobs.length>0){
      res.render('search');
    } else{
      res.redirect(301, '/');
    }
});

router.post('/',
  urlUtils.prepare,
  urlUtils.generateListUrls,
  fetchUrl.generateAllPromises,
  scanRender.fetchAll
);




module.exports = router;

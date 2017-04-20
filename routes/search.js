var express = require("express");
var router = express.Router();
var urlUtils = require('../middleware/urlUtils.js');
var fetchUrl = require('../middleware/fetchUrl.js');
var outputHTML = require('../middleware/outputHTML.js');
var scanRender = require('../controller/scanRender.js');
var apiFilter = require('../middleware/apiFilter.js');
var pagination = require('../middleware/pagination.js');

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
  fetchUrl.fetchAll,
  outputHTML,
  apiFilter,
  pagination.pagination,
  scanRender.renderHTML
);




module.exports = router;

var express = require("express");
var router = express.Router();
var scanRender = require('../controller/scanRender.js');
var urlUtils = require('../middleware/urlUtils.js');
var fetchUrl = require('../middleware/fetchUrl.js');
var outputHTML = require('../middleware/outputHTML.js');
var apiFilter = require('../middleware/apiFilter.js');


router.get('/',
  urlUtils.prepare,
  urlUtils.generateListUrls,
  fetchUrl.generateAllPromises,
  fetchUrl.fetchAll,
  outputHTML,
  apiFilter,
  function(req, res){
    res.send(res.locals.itemJobs);
  }
);

module.exports = router;

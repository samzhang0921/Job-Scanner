var express = require("express");
var router = express.Router();
var scanRender = require('../controller/scanRender.js');

router.get('/:offset/:limit', function(){
    scanRender.setLocalAllJobs();
});

module.exports = router;

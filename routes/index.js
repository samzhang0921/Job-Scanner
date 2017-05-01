var express = require("express");
var router = express.Router();
var es6 = require('es6-promise').polyfill();
var fetch = require('isomorphic-fetch');
var request = require('request');
var bodyParser = require('body-parser')
var searchRoute = require('./search.js');
var apiRoute = require('./api.js');
var account = require('./account.js');

router.get('/', function(req, res) {
    res.render('index', {
        title: 'scanner',
        headScript: '<script src="/public/scripts/script.js"></script>',
        headStyle: '<link rel="stylesheet" href="/public/stylesheet/styles.css">'
    });
});

router.use('/search', searchRoute);

router.use('/api', apiRoute);

router.use('/account', account);

module.exports = router;

var express = require("express");
var router = express.Router();
var es6 = require('es6-promise').polyfill();
var fetch = require('isomorphic-fetch');

router.get('/', function (req, res) {
   
        fetch('https://www.monster.co.uk/')
	.then(function(response) {
		if (response.status >= 400) {
			throw new Error("Bad response from server");
		}
		return response.text();
	})
	.then(function(r) {
		res.send(r);
	});
 
});
module.exports = router;
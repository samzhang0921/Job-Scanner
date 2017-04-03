var express = require("express");
var router = express.Router();
var es6 = require('es6-promise').polyfill();
var fetch = require('isomorphic-fetch');
var request = require('request');
var cheerio = require('cheerio');


function generateUrl(base, type, pageKey, pageValue, keywordKey, keywordValue) {
    var url = [];
    url.push(base);
    if (type === 'param') {
        url.push('/' + keywordValue + '/');
        url.push('?');
    } else if (type === 'query') {
        url.push('?');
        url.push(keywordKey + '=' + keywordValue);
        url.push('&');
    }
    url.push(pageKey + '=' + pageValue);
    return url.join('');
}

var siteUrls = [
    {
        "name": "monster",
        "base": "https://www.monster.co.uk/jobs/search/",
        "type": "query",
        "pageKey": "page",
        "keyword": "k",
        "selector": "#resultsWrapper"
  },
    {
        "name": "reed",
        "base": "https://www.reed.co.uk/jobs",
        "type": "query",
        "pageKey": "pageno",
        "keyword": "keywords",
        "selector": "#server-results"
  },
    {
        "name": "totaljob",
        "base": "https://www.totaljobs.com/jobs/",
        "type": "param",
        "pageKey": "page",
        "keyword": "",
        "selector": ".job-results"
  }
];


router.get('/', function (req, res) {
    res.render('index', {
                title: 'scanner',
                headScript: '<script src="/public/scripts/script.js"></script>',
                headStyle: '<link rel="stylesheet" href="/public/stylesheet/styles.css">'
            });
});

router.get('/search', function (req, res) {
    var pageQuery = req.query.page || 1;
    var pageValue = req.query.page;
    var keywordValue = req.query.keyword;

    var first = siteUrls[1];
    var firsturl = generateUrl(first.base, first.type, first.pageKey, pageValue, first.keyword, keywordValue);
    console.log(firsturl);
    fetch(firsturl)
        .then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.text();
        })
        .then(function (r) {
            // res.send(r);
            var $ = cheerio.load(r);
//            var html = $(first.selector).html();
            var items = $(first.selector).find('article');


            var jobs = [];

            items.each(function () {
                var $this = $(this);
                var job = {
                    title: $this.find('.title').html(),
                    location: $this.find('.location').html(),
                    time: $this.find('.time').html(),
                    salary: $this.find('.salary').html(),
                    applications: $this.find('.applications').html(),                     
                    description: $this.find('.description').html()
                };
                jobs.push(job);
                return jobs;
            });


            
            res.render('search', {
                title: 'scanner',
                content: jobs,
                headScript: '<script src="/public/scripts/script.js"></script>',
                headStyle: '<link rel="stylesheet" href="/public/stylesheet/styles.css">'
            });
            
        });
});


module.exports = router;


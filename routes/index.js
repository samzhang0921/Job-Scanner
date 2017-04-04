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
};

function generateListUrls(pageValue, keywordValue) {
    var allSiteUrls = [];
    for (var i = 0; i < siteUrls.length; i++) {
        var allSiteUrl = generateUrl(siteUrls[i].base, siteUrls[i].type, siteUrls[i].pageKey, pageValue, siteUrls[i].keyword, keywordValue);
        allSiteUrls.push(allSiteUrl);
    };
    return allSiteUrls;
};

function generateHTMLlist(allSiteUrls){
  var allSitesPromise = [];
  for (var i = 0; i < allSiteUrls.length; i++) {
    var htmlPromise = fetchData(allSiteUrls[i]);
    allSitesPromise.push(htmlPromise);
  }
  return allSitesPromise;
}

function fetchData(url){
  const fetchPromise = new Promise(function(resolve, reject){
    fetch(url)
           .then(function (response) {
               if (response.status >= 400) {
                    reject(new Error("Bad response from server"));
               }
               return response.text();
           }).then(function (r) {
                      resolve(r);
                    });
  });
  return fetchPromise;
}
var siteUrls = [
    {
        "name": "monster",
        "base": "https://www.monster.co.uk/jobs/search/",
        "type": "query",
        "pageKey": "page",
        "keyword": "q",
        "selector": "#resultsWrapper"
    }, {
        "name": "reed",
        "base": "https://www.reed.co.uk/jobs",
        "type": "query",
        "pageKey": "pageno",
        "keyword": "keywords",
        "selector": "#server-results"
    }, {
        "name": "totaljob",
        "base": "https://www.totaljobs.com/jobs",
        "type": "param",
        "pageKey": "page",
        "keyword": "",
        "selector": ".job-results"
    }
];

router.get('/', function(req, res) {
    res.render('index', {
        title: 'scanner',
        headScript: '<script src="/public/scripts/script.js"></script>',
        headStyle: '<link rel="stylesheet" href="/public/stylesheet/styles.css">'
    });
});

function processHTML(res, htmlString){
  var itemJobs = [];
  htmlString.forEach(function(ele, index){
    var $ = cheerio.load(ele);
    var items1 = $('article.job-result');
    var items2 = $('.job');
    var items3 = $('.js_result_container');
    console.log(items1.length);
    if (items1.length) {
      items1.each(function () {
          var $this = $(this);
          var job = {
              title: $this.find('.title').html(),
              location: $this.find('.location').html(),
              time: $this.find('.time').html(),
              salary: $this.find('.salary').html(),
              applications: $this.find('.applications').html(),
              description: $this.find('.description').html()
          };
          itemJobs.push(job);
      });
    }
    if (items2.length) {
      items2.each(function () {
          var $this = $(this);
          var job = {
              title: $this.find('.job-title').html(),
              location: $this.find('.location').html(),
              time: $this.find('.date-posted').html(),
              salary: $this.find('.salary').html(),
              applications: $this.find('.applications').html() || '',
              description: $this.find('.job-intro').html()
          };
          itemJobs.push(job);
      });
    }
    if (items3.length) {
      items3.each(function () {
          var $this = $(this);
          var job = {
              title: $this.find('.jobTitle').html(),
              location: $this.find('.job-specs-location').html(),
              time: $this.find('.job-specs-date').html(),
              salary: $this.find('.salary').html() || '',
              applications: $this.find('.applications').html() || '',
              description: $this.find('.job-intro').html() || ''
          };
          itemJobs.push(job);
      });
    }
  });

  console.log(itemJobs);

  res.render('search', {
      title: 'scanner',
      content: itemJobs,
      headScript: '<script src="/public/scripts/script.js"></script>',
      headStyle: '<link rel="stylesheet" href="/public/stylesheet/styles.css">'
  });
}

router.get('/search', function(req, res) {
    var pageValue = req.query.page || 1;
    var keywordValue = req.query.keyword || '';

    var allSiteUrlList = generateListUrls(pageValue, keywordValue);
    var infoListPromise = generateHTMLlist(allSiteUrlList);
    var allHtml = [];
    infoListPromise.forEach(function(promise, index){
      promise.then(function(r){
        allHtml.push(r);
        if(allHtml.length === 3){
          processHTML(res, allHtml);
        }
      });
    });
});

router.post('/search', function(req, res){
  // var keyword = req.body.keyword;
  // ...
  res.end('posted');

});

module.exports = router;

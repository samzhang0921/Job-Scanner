var express = require("express");
var router = express.Router();
var es6 = require('es6-promise').polyfill();
var fetch = require('isomorphic-fetch');
var request = require('request');
var cheerio = require('cheerio');
var bodyParser = require('body-parser')

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

function generateListUrls(keywordValue) {
    var allSiteUrls = [];
    for (var k = 1; k < 4; k++) {
      for (var i = 0; i < siteUrls.length; i++) {
          var allSiteUrl = generateUrl(siteUrls[i].base, siteUrls[i].type, siteUrls[i].pageKey, k, siteUrls[i].keyword, keywordValue);
          allSiteUrls.push(allSiteUrl);
      };
    }

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
    var items3 = $('.js_result_container.primary');
    // console.log(items1.length);
    if (items1.length) {
      items1.each(function () {
          var $this = $(this);
          var job = {
              title: $this.find('.title').text(),
              location: $this.find('.location').text(),
              time: $this.find('.time').text(),
              salary: $this.find('.salary').html(),
              applications: $this.find('.applications').html(),
              description: $this.find('.description').html(),
              site:"https://www.reed.co.uk"+$this.find('.title a').attr('href')
          };
          itemJobs.push(job);
      });
    }
    if (items2.length) {
      items2.each(function () {
          var $this = $(this);
          var job = {
              title: $this.find('.job-title h2').text(),
              location: $this.find('.location').text(),
              time: $this.find('.date-posted').text(),
              salary: $this.find('.salary').html(),
              applications: $this.find('.applications').html() || 'Unspecified',
              description: $this.find('.job-intro').html(),
              site:"https://www.totaljobs.com"+$this.find('.job-title a').attr('href')
          };
          itemJobs.push(job);
      });
    }
    if (items3.length) {
      items3.each(function () {
          var $this = $(this);
          var job = {
              title: $this.find('.jobTitle h2').text(),
              location: $this.find('.job-specs-location').text(),
              time: $this.find('.job-specs-date').text(),
              salary: $this.find('.salary').html() || 'Unspecified',
              applications: $this.find('.applications').html() || 'Unspecified',
              description: $this.find('.job-intro').html() || '',
              site:"https://www.monster.co.uk"+$this.find('.jobTitle a').attr('href')
          };
          itemJobs.push(job);
      });
    }
  });

  console.log(itemJobs.length);

  res.render('search', {
      title: 'scanner',
      content: itemJobs,
      headScript: '<script src="/public/scripts/script.js"></script>',
      headStyle: '<link rel="stylesheet" href="/public/stylesheet/styles.css">'
  });
}
//
// router.get('/search', function(req, res) {
//     var pageValue = req.query.page || 1;
//     var keywordValue = req.query.keyword || '';
//
//     var allSiteUrlList = generateListUrls(pageValue, keywordValue);
//     var infoListPromise = generateHTMLlist(allSiteUrlList);
//     var allHtml = [];
//     infoListPromise.forEach(function(promise, index){
//       promise.then(function(r){
//         allHtml.push(r);
//         if(allHtml.length === 3){
//           processHTML(res, allHtml);
//         }
//       });
//     });
// });

router.post('/search', function(req, res){
  var keywordValue = req.body.keyword;
  // var pageValue = req.query.page || 1;


  var allSiteUrlList = generateListUrls(keywordValue);
  console.log (allSiteUrlList);
  var infoListPromise = generateHTMLlist(allSiteUrlList);
  var allHtml = [];
  infoListPromise.forEach(function(promise, index){
    promise.then(function(r){
      allHtml.push(r);
      if(allHtml.length === allSiteUrlList.length){
        processHTML(res, allHtml);


      }
    });
  });
  // ...
  // res.end('posted');

});

module.exports = router;

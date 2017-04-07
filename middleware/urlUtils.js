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

function prepare(req, res, next){
  res.locals.keywordValue = req.body.keyword;
  res.locals.siteUrls = siteUrls;
  next();
}

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

function generateListUrls(req, res, next) {
    var allSiteUrls = [];
    for (var k = 1; k < 4; k++) {
      for (var i = 0; i < res.locals.siteUrls.length; i++) {
          var allSiteUrl = generateUrl(res.locals.siteUrls[i].base, res.locals.siteUrls[i].type, res.locals.siteUrls[i].pageKey, k, res.locals.siteUrls[i].keyword, res.locals.keywordValue);
          allSiteUrls.push(allSiteUrl);
      };
    }
    res.locals.allSiteUrls = allSiteUrls;
    next();
};


module.exports = {
    generateListUrls: generateListUrls,
    generateUrl: generateUrl,
    prepare: prepare
};

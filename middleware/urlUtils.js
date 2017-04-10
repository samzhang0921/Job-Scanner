var siteUrls = require('../model/siteUrls.js');

function prepare(req, res, next){
  res.locals.keywordValue = req.body.keyword || req.query.keyword;
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

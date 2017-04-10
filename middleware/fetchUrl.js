var fetch = require('isomorphic-fetch');

function generateAllPromises(req, res, next){
  var allSitesPromise = [];
  for (var i = 0; i < res.locals.allSiteUrls.length; i++) {
    var htmlPromise = fetchData(res.locals.allSiteUrls[i]);
    allSitesPromise.push(htmlPromise);
  }
  res.locals.allSitesPromise = allSitesPromise;
  next();
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

function fetchAll(req, res, next) {
  Promise.all(res.locals.allSitesPromise).then(function(values){
    res.locals.allHtml = values;
    next();
  });
}

module.exports = {
    fetchData: fetchData,
    generateAllPromises: generateAllPromises,
    fetchAll: fetchAll
};

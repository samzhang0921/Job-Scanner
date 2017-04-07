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

function setAllJobsHTML(req, res, next){
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
    res.locals.itemJobs = itemJobs;
  });
  next();
}

module.exports = {
    fetchData: fetchData,
    generateAllPromises: generateAllPromises
};

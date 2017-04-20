module.exports = function(req, res, next){
  var offset = parseInt(req.query.offset || 0);
  var limit = parseInt(req.query.limit || 30);
  var total = res.locals.itemJobs.length;
  var upper = (offset >= total) ? total : offset + limit;
  res.locals.total = res.locals.itemJobs.length;
  var itemJobs = res.locals.itemJobs;
  res.locals.itemJobs = itemJobs.filter(function(value, index){
    return (index>=offset && index<upper);
  });
  res.locals.pageNumber = Math.ceil(res.locals.total / limit);
  next();
};

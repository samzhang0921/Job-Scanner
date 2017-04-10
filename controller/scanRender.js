function renderHTML(req, res){
  res.render('search', {
      title: 'scanner',
      headScript: '<script src="/public/scripts/script.js"></script>',
      headStyle: '<link rel="stylesheet" href="/public/stylesheet/styles.css">'
  });
}

module.exports = {
  renderHTML:renderHTML
}

var express = require ("express");
var path = require ('path');
var hbs = require ('express-handlebars');
var routes = require ('./routes/index')
var app = express ();

app.use('/public', express.static(path.join(__dirname, 'public')))

app.engine('hbs', hbs({defaultLayout: 'main', extname: '.hbs', layoutsDir: __dirname+'/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use('/', routes);

app.listen(3000, function() {
    console.log('Listening on port 3000');
});

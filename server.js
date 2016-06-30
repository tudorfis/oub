var express = require('express'),
    app = express(),
    os = require('os'),
    fs = require('fs'),
    path = require('path'),
    sassMiddleware = require('node-sass-middleware'),
    bodyParser = require('body-parser'),
    server = require('http').createServer(app);

// set app response
app.use(express.static('./app/'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// set app sass
var app_css = './app/assets/css/app.css';
fs.exists(app_css, function(exists) {
    if (exists) {
        fs.unlink(app_css);
    }
});

app.use(sassMiddleware({
    src: __dirname + '/app',
    dest: path.join(__dirname, 'app'),
    debug: true,
    outputStyle: 'compressed',
    prefix:  '/prefix'  // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
}));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/app/index.html');
});

var port = 3000;
server.listen(port);
console.log('http://'+ os.hostname() +':'+ port +' app started !');
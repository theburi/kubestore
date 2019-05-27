
var bodyParser = require('body-parser');

var express = require('express');

var app = express();
var path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/assets', express.static(__dirname + '/assets'));
app.use('/states', express.static(__dirname + '/states'));
app.use('/lib', express.static(__dirname + '/lib'));
app.use('/index.js', express.static(__dirname + '/index.js'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

/* GET home page. */
app.get('*', function (req, res, next) { 
  console.log(__dirname);
  res.sendFile(__dirname + '/main.html');
});

app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
  });


  

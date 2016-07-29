require('babel-core/register');


var React = require('react');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(express.static(__dirname + '/dist'));

var port = process.env.PORT || 7000;

app.listen(port, function() {
  console.log('Node app is running on port', port);
});

app.get('/app.js', function (req, res) {
  res.sendFile(__dirname + '/dist/app.js');
});

app.get('/*', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

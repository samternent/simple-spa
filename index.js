require('babel-core/register');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(cors());
app.use(bodyParser.json());       // to support JSON-encoded bodies

var port = process.env.PORT || 7001;
app.listen(port, function() { console.log('Node app is running on port', port);});

require('./src/routes')(app);

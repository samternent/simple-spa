require('babel-core/register');


var React = require('react');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(express.static(__dirname + '/app'));
app.use('/assets', express.static(__dirname + '/app'));

var port = process.env.PORT || 7000;

app.listen(port, function() {
  console.log('Node app is running on port', port);
});


var renderToString = require('react-dom/server').renderToString

// app.get('/posts/:postId', function (req, res) {
//   console.log(req.params.postId)
//   var app = renderToString(React.createElement(App));
//   res.send(app)
// });
// app.get('/comments/:postId', function (req, res) {
//   console.log(req.params.postId)
// });

app.get('/*', function (req, res) {
  res.sendFile(__dirname + '/app/index.html');
  // myReactRoute(res, req.url.replace('/',''));
});




// var myReactRoute = function (res, route) {
//   route = routes.check(route);
//
//   AppStore.setState({ route: route });
//   var app = renderToString( <App /> );
//
//   res.render('index.ejs', {
//       app   : app,
//       route : route || 'home'
//     });
// };

require('babel-core/register');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(cors());
app.use(bodyParser.json());       // to support JSON-encoded bodies

var port = process.env.PORT || 7001;

app.listen(port, function() {
  console.log('Node app is running on port', port);
});

app.get('/users', function (req, res) {
    return res.json(getUsers());
});

app.get('/posts', function (req, res) {
  var userId = req.query.userId;

  if(!userId) {
      return res.json({"status": "error", "message": "missing id"});
  } else {
    return res.json(getPosts(userId));
  }
});

app.get('/comments', function (req, res) {
  var postId = req.query.postId;

  if(!postId) {
      return res.json({"status": "error", "message": "missing id"});
  } else {
    return res.json(getComments(postId));
  }
});






var users = require('./data/users');
var posts = require('./data/posts')
var comments = require('./data/comments');


function getUsers() {
  // Get all users from DB
  return users;
}
function getPosts(userId) {
  // Get all posts assigned to user form DB
  const returnObj = {};
  Object.keys(posts).filter(key => {
    const post = posts[key];
    if (post.userId === userId) returnObj[post.id] = post;
  });

  return returnObj;
}
function getComments(postId) {
  const returnObj = {};
  Object.keys(comments).filter(key => {
    const comment = comments[key];
    if (comment.postId === postId) returnObj[comment.id] = comment;
  });

  return returnObj;
}

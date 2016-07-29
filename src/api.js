
var users = require('../data/users');
var posts = require('../data/posts')
var comments = require('../data/comments');

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

module.exports = {
  getUsers: getUsers,
  getPosts: getPosts,
  getComments: getComments
}

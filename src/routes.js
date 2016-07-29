var api = require('./api');

module.exports = function (app) {
  app.get('/users', function (req, res) {
      return res.json(api.getUsers());
  });

  app.get('/posts', function (req, res) {
    var userId = req.query.userId;

    if(!userId) {
        return res.json({"status": "error", "message": "missing id"});
    } else {
      return res.json(api.getPosts(userId));
    }
  });

  app.get('/comments', function (req, res) {
    var postId = req.query.postId;

    if(!postId) {
        return res.json({"status": "error", "message": "missing id"});
    } else {
      return res.json(api.getComments(postId));
    }
  });
}

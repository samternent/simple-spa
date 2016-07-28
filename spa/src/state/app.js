import {createStore} from 'tbg-flux-factory';

import request from 'reqwest';

const appStore = createStore({
  name: 'app',
  data: {
    users: [],
    posts: [],
    comments: [],
    currentUser: {},
    currentPost: {},
    loading: false,
  },
  actions: {
    view: {},
    server: {
      getUsers() {
        this.setState({ loading: true })
        request('http://localhost:7001/users', users => this.setState({ users, loading: false }));
      },
      getPosts(userId) {
        this.setState({ loading: true })
        request({
          url: 'http://localhost:7001/posts',
          data: {userId}
        }, posts => this.setState({ posts, currentUser: this.data.users[userId], loading: false}))
      },
      getComments(postId) {
        this.setState({ loading: true })
        request({
          url: 'http://localhost:7001/comments',
          data: {postId}
        }, comments => this.setState({ comments, currentPost: this.data.posts[postId], loading: false}))
      }
    }
  }
});

export default appStore;

// https://github.com/thebeansgroup/tbg-flux-factory
// a factory wrapper I wrote around facebooks Flux implementation
import {createStore} from 'tbg-flux-factory';

import request from 'reqwest';


const api_link = 'https://simple-spa-api.herokuapp.com/';
// const api_link = 'http://localhost:7001';

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
    server: {
      getUsers() {
        this.setState({ loading: true })
        request(`${api_link}/users`, users => this.setState({ users, loading: false }));
      },
      getPosts(userId) {
        this.setState({ loading: true })
        request({
          url: `${api_link}/posts`,
          data: {userId}
        }, posts => this.setState({ posts, currentUser: this.data.users[userId], loading: false}))
      },
      getComments(postId) {
        this.setState({ loading: true })
        request({
          url: `${api_link}/comments`,
          data: {postId}
        }, comments => this.setState({ comments, currentPost: this.data.posts[postId], loading: false}))
      }
    }
  }
});

export default appStore;

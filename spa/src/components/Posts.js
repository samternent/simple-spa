import request from 'reqwest';
import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import {getStore, addChangeListener} from 'tbg-flux-factory';
const appStore = getStore('app');

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, appStore.getState(), {});
    this.handleStoreUpdate = this.handleStoreUpdate.bind(this);
  }
  componentWillMount() {
    appStore.addChangeListener(this.handleStoreUpdate);
    appStore.Actions.getPosts(this.props.routeParams.userId);
    if (!this.state.users) appStore.Actions.getUsers();
  }

  componentWillUnmount() {
    appStore.removeChangeListener(this.handleStoreUpdate);
  }

  handleStoreUpdate() {
    this.setState(appStore.getState());
  }

  renderUsers() {
    const postArray = Object.keys(this.state.posts);
    if (postArray.length === 0) return <div className=''>Soory, no posts for this user</div>
    return postArray.map(key => {
      const post = this.state.posts[key];
      return(
        <li className='post-list__item' key={`key_${post.id}`}>
          <Link to={`/comments/${post.id}`}>
            <div className='list-id'>{post.id}</div>
            <h3>{post.title}</h3>
            <div>{post.message}</div>
          </Link>
        </li>
      );
    });
  }

  render() {
    return (
      <div className='main-app'>
        <Link className='back-btn' to='/users'>Users</Link> <h2>Posts</h2>
        {(this.state.loading) ? <div className='loader' /> : (
          <ul className='post-list'>{this.renderUsers()}</ul>
        )}
      </div>
    );
  }
}

export default Posts;

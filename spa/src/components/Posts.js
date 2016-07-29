import request from 'reqwest';
import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import {getStore, addChangeListener} from 'tbg-flux-factory';
const appStore = getStore('app');

class Posts extends Component {
  componentWillMount() {
    appStore.Actions.getPosts(this.props.routeParams.userId);
    if (!this.props.users) appStore.Actions.getUsers();
  }

  renderUsers() {
    const postArray = Object.keys(this.props.posts);
    if (postArray.length === 0) return <div className=''>Soory, no posts for this user</div>
    
    return postArray.map(key => {
      const post = this.props.posts[key];
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
        <Link className='back-btn' to='/users'>Users</Link>
        {(this.props.loading) ? <div className='loader' /> : (
          <div>
            <h2>Posts</h2>
            <ul className='post-list'>{this.renderUsers()}</ul>
          </div>
        )}
      </div>
    );
  }
}

export default Posts;

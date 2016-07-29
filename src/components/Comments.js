import request from 'reqwest';
import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import {getStore, addChangeListener} from 'tbg-flux-factory';
const appStore = getStore('app');

class Posts extends Component {
  componentWillMount() {
    appStore.Actions.getComments(this.props.routeParams.postId);
  }

  renderUsers() {
    const commentsArray = Object.keys(this.props.comments);
    if (commentsArray.length === 0) return <div>Sorry, no comments for this post</div>

    const userDOM = commentsArray.map(key => {
      const comment = this.props.comments[key];
      return(
        <li className='comment-list__item' key={`key_${comment.id}`}>
          <div className='list-id'>{comment.id}</div>
          <div>{comment.message}</div>
        </li>
      );
    });

    return <ul className='comment-list'>{userDOM}</ul>
  }

  getBackLink() {
    const props = (!this.props.currentPost)
    ?
    {
      to: '/users',
      text: 'Home'
    }
    :
    {
      to: `/posts/${this.props.currentPost.userId}`,
      text: 'Posts'
    };

    return (
      <Link className='back-btn' to={props.to}>{props.text}</Link>
    );
  }

  render() {
    return (
      <div className='main-app'>
        {this.getBackLink()}
        {(this.props.loading) ? <div className='loader' /> : (
          <div>
            <h2>Comments</h2>
            <ul>{this.renderUsers()}</ul>
          </div>
        )}
      </div>
    );
  }
}

export default Posts;

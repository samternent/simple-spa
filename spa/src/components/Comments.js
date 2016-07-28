import request from 'reqwest';
import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import {getStore, addChangeListener} from 'tbg-flux-factory';
const appStore = getStore('app');

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, appStore.getState(), {

    });
    this.handleStoreUpdate = this.handleStoreUpdate.bind(this);
  }
  componentWillMount() {
    appStore.addChangeListener(this.handleStoreUpdate);
    appStore.Actions.getComments(this.props.routeParams.postId);
  }

  componentWillUnmount() {
    appStore.removeChangeListener(this.handleStoreUpdate);
  }

  handleStoreUpdate() {
    this.setState(appStore.getState());
  }


  renderUsers() {
    const commentsArray = Object.keys(this.state.comments);
    if (commentsArray.length === 0) return <div className=''>Sorry, no comments for this post</div>

    const userDOM = commentsArray.map(key => {
      const comment = this.state.comments[key];
      console.log(comment)
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
    const props = (!this.state.currentPost)
    ?
    {
      to: '/users',
      text: 'Home'
    }
    :
    {
      to: `/posts/${this.state.currentPost.userId}`,
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
        {(this.state.loading) ? <div className='loader' /> : (
          <div>
            <h2>Comments</h2>
            <ul>{this.renderUsers()}</ul>
          </div>
        )}
      </div>
    );
  }
}

Posts.propTypes = {
  posts: PropTypes.array
}
Posts.defaultProps = {
  posts: []
}

export default Posts;

import request from 'reqwest';
import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

// TBG flux factory link
import {getStore, addChangeListener} from 'tbg-flux-factory';
const appStore = getStore('app');

export default class Users extends Component {
  componentWillMount() {
    appStore.Actions.getUsers();
  }

  renderUsers() {
    // Item template
    return Object.keys(this.props.users).map(key => {
      const user = this.props.users[key];
      return(
        <li className='user-list__item' key={`key_${user.id}`}>
          <Link to={`/posts/${user.id}`}>
            <div className='list-id'>{user.id}</div>
            <h3>{user.name}</h3>
            <div className='list-username'>{user.username} <span className='list-email'>{user.email}</span></div>
          </Link>
        </li>
      );
    });
  }

  render() {
    return (
      <div className='main-app'>
      {(this.props.loading) ? <div className='loader' /> : (
        <div>
          <h2>Users</h2>
          <ul className='user-list'>{this.renderUsers()}</ul>
        </div>
      )}
      </div>
    );
  }
}

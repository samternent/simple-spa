import request from 'reqwest';
import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

// TBG flux factory link
import {getStore, addChangeListener} from 'tbg-flux-factory';
const appStore = getStore('app');

export default class Users extends Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, appStore.getState(), {});
    this.handleStoreUpdate = this.handleStoreUpdate.bind(this);
  }
  componentWillMount() {
    appStore.addChangeListener(this.handleStoreUpdate);
    appStore.Actions.getUsers();
  }

  componentWillUnmount() {
    appStore.removeChangeListener(this.handleStoreUpdate);
  }

  handleStoreUpdate() {
    this.setState(appStore.getState());
  }

  renderUsers() {
    // Item template
    const userDOM = Object.keys(this.state.users).map(key => {
      const user = this.state.users[key];
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

    // Return list of items
    return <ul className='user-list'>{userDOM}</ul>
  }

  render() {
    if (this.state.loading) return null;
    return (
      <div className='main-app'>
      {(this.state.loading) ? <div className='loader' /> : (
        <div>
          <h2>Users</h2>
          <ul>{this.renderUsers()}</ul>
        </div>
      )}
      </div>
    );
  }
}

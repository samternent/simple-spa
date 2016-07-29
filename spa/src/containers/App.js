import '../styles/main'
import '../state/app';
import React, {Component, cloneElement} from 'react';


import {getStore, addChangeListener} from 'tbg-flux-factory';
const appStore = getStore('app');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, appStore.getState(), {});
    this.handleStoreUpdate = this.handleStoreUpdate.bind(this);
  }
  componentWillMount() {
    appStore.addChangeListener(this.handleStoreUpdate);
  }

  componentWillUnmount() {
    appStore.removeChangeListener(this.handleStoreUpdate);
  }

  handleStoreUpdate() {
    this.setState(appStore.getState());
  }

  render() {
    return (
      <div>
        <header className='header'>
          <h1>React SPA</h1>
        </header>
        <div className='main-app'>
          {cloneElement(this.props.children, this.state)}
        </div>
        <footer className='footer'>
          made with <span className='heart'>&hearts;</span>... for chrome...
        </footer>
      </div>
    );
  }
}

export default App;

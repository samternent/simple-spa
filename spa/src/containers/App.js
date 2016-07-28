import '../styles/main'
import '../state/app';
import React, {Component} from 'react';

class App extends Component {
  render() {
    return (
      <div className='main-app pure-g'>
        <header>
          <h1>React SPA</h1>
        </header>
        {this.props.children}
      </div>
    );
  }
}

export default App;

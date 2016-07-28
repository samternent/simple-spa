import React from "react";
import {render} from "react-dom";

import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import App from "../src/containers/App";

import Users from '../src/components/Users';
import Posts from '../src/components/Posts';
import Comments from '../src/components/Comments';

render(
  (
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Users} />
        <Route path="users" component={Users} />
        <Route path="posts/:userId" component={Posts} />
        <Route path="comments/:postId" component={Comments} />
      </Route>
    </Router>
  ),
  document.getElementById('main-app')
);

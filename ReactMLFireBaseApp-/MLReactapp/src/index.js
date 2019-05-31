import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import { Redirect, Route, Switch } from 'react-router';
import { Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';


import Login from './features/Login';
import Home from './features/Home';
import Cam from './features/Camera';
import Album from "./features/Album";



const customHistory = createBrowserHistory();
 //render login from login path , render Home from Home path
const Root = () => {
  return (
    <Router history={customHistory}>

     <Switch>
      <Route path="/Album" component={Album}/>
      <Route path="/login"  component={Login} />
      <Route path="/app/home" component={Home} />
      <Redirect from="/" to="/login" />
     </Switch>
    </Router>
  )
}



ReactDOM.render(<Root />, document.getElementById('root'));





serviceWorker.unregister();

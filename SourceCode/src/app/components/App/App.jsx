/**
 * App component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';
import { Redirect, Route, Switch, Router } from 'react-router-dom';
import createBrowserHistory from "history/createBrowserHistory";

import Main from '../Main/Main';
import Login from '../Login/Login';
import GamePlay from '../GamePlay/GamePlay';

import appData from '../../data/app.json';

import '../../css/app.scss';

const customHistory = createBrowserHistory();

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }



  render() {
    return (
      <Router history={customHistory}>
        <div>
          <Route exact path="/login" render={props => <Login {...props} />} />
          <Route exact path="/navigation/" render={props => <Main {...props} />} />
          <Route exact path="/gameplay/" render={props => <GamePlay {...props} />} />
          <Redirect from="/" to="/login"/>
        </div>
      </Router>
    );
  }
}

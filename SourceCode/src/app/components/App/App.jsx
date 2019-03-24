/**
 * App component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';
import { Redirect, Route, Switch, Router } from 'react-router-dom';
import createBrowserHistory from "history/createBrowserHistory";

import Navigation from '../Navigation/Navigation';
import Landing from '../Landing/Landing';
import Login from '../Login/Login';
import Legend from '../Legend/Legend';
import ChooseUsername from '../ChooseUsername/ChooseUsername';
import GamePlayMath from '../GamePlayMath/GamePlayMath';
import Stats from '../Stats/Stats';
import Creatures from '../Creatures/Creatures';

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
          <Route exact path="/" render={props => <Landing {...props} />} />
          <Route exact path="/legend" render={props => <Legend {...props} />} />
          <Route exact path="/login" render={props => <Login {...props} />} />
          <Route exact path="/chooseusername/" render={props => <ChooseUsername {...props} />} />
          <Route exact path="/navigation/" render={props => <Navigation {...props} />} />
          <Route exact path="/math/" render={props => <GamePlayMath {...props} />} />
          <Route exact path="/statistics/" render={props => <Stats {...props} />} />
          <Route exact path="/creatures/" render={props => <Creatures {...props} />} />
          {/*<Redirect from="/" to="/login"/>*/}
        </div>
      </Router>
    );
  }
}

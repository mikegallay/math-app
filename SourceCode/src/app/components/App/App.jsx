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
import Profile from '../Profile/Profile';
import Store from '../Store/Store';
import Help from '../Help/Help';
import Creatures from '../Creatures/Creatures';
import Cookies from '../Cookies/Cookies';

import appData from '../../data/app.json';

import '../../css/app.scss';

const customHistory = createBrowserHistory();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    var cookiepolicy = JSON.parse(localStorage.getItem("cookiepolicy"));
    var localUser = JSON.parse(localStorage.getItem("localUser"));
    let hasCookies = (cookiepolicy)?true:false;
    let hasLogin = (localUser)?true:false;
    this.state = {hasCookies,hasLogin};
  }

  ateCookies(){
    console.log('ate cookies');
    this.setState({hasCookies:true})
  }

  hasLoggedIn(){
    console.log('logged in');
    this.setState({hasLogin:true})
  }

  render() {
    console.log(this.state.hasLogin,this.state.hasCookies);
    const NeedsCookies = ({ component: Component, rest }) => (
      <Route {...rest} render={props => (
        this.state.hasCookies === true
          ? <Component loggedIn={this.state.hasLogin} hasLoggedIn={() => this.hasLoggedIn()} {...props} />
          : <Redirect to='/' />
      )} />
    )

    const NeedsLogin = ({ component: Component, rest }) => (
      <Route {...rest} render={props => (
        (this.state.hasLogin) === true
          ? <Component {...props} />
          : <Redirect to='/login' />
      )} />
    )

    return (
      <Router history={customHistory}>
        <Switch>
          <Route exact path="/" render={props => <Landing ateCookies={() => this.ateCookies()} {...props} />} />
          <NeedsCookies exact path="/legend" component={Legend} />
          <NeedsCookies exact path="/login" component={Login} />
          <NeedsLogin exact path="/chooseusername/" component={ChooseUsername} />
          <NeedsLogin exact path="/navigation/" component={Navigation} />
          <NeedsLogin exact path="/math/" component={GamePlayMath} />
          <NeedsLogin exact path="/profile/" component={Profile} />
          <NeedsLogin exact path="/store/" component={Store} />
          <NeedsCookies exact path="/help/" component={Help} />
          <NeedsLogin exact path="/creatures/" component={Creatures} />
          <Route exact path="/cookies/" render={props => <Cookies {...props} />} />
          {/*<Redirect from="/" to="/login"/>*/}
        </Switch>
        {/*
          <Route exact path="/" render={props => <Landing {...props} />} />
          <Route exact path="/legend" render={props => <Legend {...props} />} />
          <Route exact path="/login" render={props => <Login {...props} />} />
          <Route exact path="/chooseusername/" render={props => <ChooseUsername {...props} />} />
          <PrivateRoute exact path="/navigation/" component={Navigation} />
          <Route exact path="/math/" render={props => <GamePlayMath {...props} />} />
          <Route exact path="/profile/" render={props => <Profile {...props} />} />
          <Route exact path="/store/" render={props => <Store {...props} />} />
          <Route exact path="/help/" render={props => <Help {...props} />} />
          <Route exact path="/creatures/" render={props => <Creatures {...props} />} />
          <Route exact path="/cookies/" render={props => <Cookies {...props} />} />
          */}
      </Router>
    );
  }
}

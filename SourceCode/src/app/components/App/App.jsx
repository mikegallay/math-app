/**
 * App component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Main from '../Main/Main';
import Addition from '../Addition/Addition';

import appData from '../../data/app.json';

import '../../css/app.scss';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" render={props => <Addition {...props} />} />
        <Route path="/addition/" render={props => <Addition {...props} />} />
      </Switch>
    );
  }
}
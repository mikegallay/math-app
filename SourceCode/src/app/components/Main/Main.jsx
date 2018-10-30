/**
 * Main component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';
import { Link } from 'react-router-dom';

import './Main.scss';

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <main className="page-main">
        Main route | <Link to="/gameplay/">Play Game</Link>
        <div className="gameModes">
          <a href="/addition/">Addition</a>
          <a href="/subtraction/">Subtraction</a>
        </div>
      </main>
    );
  }
}

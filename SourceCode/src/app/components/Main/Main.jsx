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
        <h1>MathApp</h1>
        <div className="gameModes">
          <Link to={{ pathname: '/gameplay', state: { operator: 'add', gamemode:'health'} }}>Addition Health</Link>
          <Link to={{ pathname: '/gameplay', state: { operator: 'add', gamemode:'countdown'} }}>Addition Timer</Link>

          <Link to={{ pathname: '/gameplay', state: { operator: 'sub', gamemode:'health'} }}>Subtraction Health</Link>
          <Link to={{ pathname: '/gameplay', state: { operator: 'sub', gamemode:'countdown'} }}>Subtraction Timer</Link>
        </div>
      </main>
    );
  }
}

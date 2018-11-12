/**
 * Main component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';
import { Link } from 'react-router-dom';

import './Main.scss';
import stopwatch from '../../images/stopwatch.png';
import heart from '../../images/heart.png';

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <main className="page-main">
        <h1>MathMinute</h1>
        <p className="instructions">Choose the game mode for the math skill you&nbsp;want to practice. </p>
        <div className="main-menu">
          <div className="menu-btns">
            <Link className="health-btn" to={{ pathname: '/gameplay', state: { operator: 'add', gamemode:'health'} }}>
              <img src={heart} width="25" height="25"/>
            </Link>
            <span className="menu-name">ADDITION</span>
            <Link className="stopwatch-btn" to={{ pathname: '/gameplay', state: { operator: 'add', gamemode:'countdown'} }}>
              <img src={stopwatch} width="25" height="25"/>
            </Link>
          </div>

          <div className="menu-btns">
            <Link className="health-btn" to={{ pathname: '/gameplay', state: { operator: 'sub', gamemode:'health'} }}>
              <img src={heart} width="25" height="25"/>
            </Link>
            <span className="menu-name">SUBTRACTION</span>
            <Link className="stopwatch-btn" to={{ pathname: '/gameplay', state: { operator: 'sub', gamemode:'countdown'} }}>
              <img src={stopwatch} width="25" height="25"/>
            </Link>
          </div>

          <div className="menu-btns">
            <Link className="health-btn" to={{ pathname: '/gameplay', state: { operator: 'mul', gamemode:'health'} }}>
              <img src={heart} width="25" height="25"/>
            </Link>
            <span className="menu-name">MULTIPLICATION</span>
            <Link className="stopwatch-btn" to={{ pathname: '/gameplay', state: { operator: 'mul', gamemode:'countdown'} }}>
              <img src={stopwatch} width="25" height="25"/>
            </Link>
          </div>

          <div className="menu-btns">
            <Link className="health-btn" to={{ pathname: '/gameplay', state: { operator: 'div', gamemode:'health'} }}>
              <img src={heart} width="25" height="25"/>
            </Link>
            <span className="menu-name">DIVISION</span>
            <Link className="stopwatch-btn" to={{ pathname: '/gameplay', state: { operator: 'div', gamemode:'countdown'} }}>
              <img src={stopwatch} width="25" height="25"/>
            </Link>
          </div>

        </div>
        <p className="credit">©2018 Mike Gallay</p>
      </main>
    );
  }
}

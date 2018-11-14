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
        <h1>Math in a Minute</h1>
        <p className="instructions">Choose the game mode for the math skill you&nbsp;want to practice. </p>
        <p className="instructions"><img className="legend" src={heart} width="25" height="25"/><span> Play until you make 3 mistakes</span></p>
        <p className="instructions"><img className="legend" src={stopwatch} width="25" height="25"/><span> Answer as many as you can in 60 seconds</span></p>
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

          <p className="instructions mb10">Times Tables</p>
          <div className="menu-btns">
            <Link className="health-btn" to={{ pathname: '/gameplay', state: { operator: 'mul', gamemode:'health', constant:9} }}>
              <img src={heart} width="25" height="25"/>
            </Link>
              <span className="menu-name">9X TABLE</span>
            <Link className="stopwatch-btn" to={{ pathname: '/gameplay', state: { operator: 'mul', gamemode:'countdown', constant:9} }}>
              <img src={stopwatch} width="25" height="25"/>
            </Link>
          </div>

          <div className="menu-btns">
            <Link className="health-btn" to={{ pathname: '/gameplay', state: { operator: 'mul', gamemode:'health', constant:8} }}>
              <img src={heart} width="25" height="25"/>
            </Link>
              <span className="menu-name">8X TABLE</span>
            <Link className="stopwatch-btn" to={{ pathname: '/gameplay', state: { operator: 'mul', gamemode:'countdown', constant:8} }}>
              <img src={stopwatch} width="25" height="25"/>
            </Link>
          </div>

          <div className="menu-btns">
            <Link className="health-btn" to={{ pathname: '/gameplay', state: { operator: 'mul', gamemode:'health', constant:7} }}>
              <img src={heart} width="25" height="25"/>
            </Link>
              <span className="menu-name">7X TABLE</span>
            <Link className="stopwatch-btn" to={{ pathname: '/gameplay', state: { operator: 'mul', gamemode:'countdown', constant:7} }}>
              <img src={stopwatch} width="25" height="25"/>
            </Link>
          </div>

          <div className="menu-btns">
            <Link className="health-btn" to={{ pathname: '/gameplay', state: { operator: 'mul', gamemode:'health', constant:6} }}>
              <img src={heart} width="25" height="25"/>
            </Link>
              <span className="menu-name">6X TABLE</span>
            <Link className="stopwatch-btn" to={{ pathname: '/gameplay', state: { operator: 'mul', gamemode:'countdown', constant:6} }}>
              <img src={stopwatch} width="25" height="25"/>
            </Link>
          </div>

          <div className="menu-btns">
            <Link className="health-btn" to={{ pathname: '/gameplay', state: { operator: 'mul', gamemode:'health', constant:5} }}>
              <img src={heart} width="25" height="25"/>
            </Link>
              <span className="menu-name">5X TABLE</span>
            <Link className="stopwatch-btn" to={{ pathname: '/gameplay', state: { operator: 'mul', gamemode:'countdown', constant:5} }}>
              <img src={stopwatch} width="25" height="25"/>
            </Link>
          </div>

          <div className="menu-btns">
            <Link className="health-btn" to={{ pathname: '/gameplay', state: { operator: 'mul', gamemode:'health', constant:4} }}>
              <img src={heart} width="25" height="25"/>
            </Link>
              <span className="menu-name">4X TABLE</span>
            <Link className="stopwatch-btn" to={{ pathname: '/gameplay', state: { operator: 'mul', gamemode:'countdown', constant:4} }}>
              <img src={stopwatch} width="25" height="25"/>
            </Link>
          </div>

          <div className="menu-btns">
            <Link className="health-btn" to={{ pathname: '/gameplay', state: { operator: 'mul', gamemode:'health', constant:3} }}>
              <img src={heart} width="25" height="25"/>
            </Link>
              <span className="menu-name">3X TABLE</span>
            <Link className="stopwatch-btn" to={{ pathname: '/gameplay', state: { operator: 'mul', gamemode:'countdown', constant:3} }}>
              <img src={stopwatch} width="25" height="25"/>
            </Link>
          </div>

          <div className="menu-btns">
            <Link className="health-btn" to={{ pathname: '/gameplay', state: { operator: 'mul', gamemode:'health', constant:2} }}>
              <img src={heart} width="25" height="25"/>
            </Link>
              <span className="menu-name">2X TABLE</span>
            <Link className="stopwatch-btn" to={{ pathname: '/gameplay', state: { operator: 'mul', gamemode:'countdown', constant:2} }}>
              <img src={stopwatch} width="25" height="25"/>
            </Link>
          </div>

        </div>
        <p className="credit">©2018 Mike Gallay</p>
      </main>
    );
  }
}

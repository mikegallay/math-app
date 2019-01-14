/**
 * Stats component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';
import { Link } from 'react-router-dom';

import './Stats.scss';

const localUser = "localUser";

export default class Stats extends React.Component {
  constructor(props) {
    super(props);

    //check current high score
    // localStorage.setItem(localUser, JSON.stringify(existingData));
    // var locUser = JSON.parse(localStorage.getItem(localUser));
    // console.log('main',locUser, (locUser));

  }

  render() {
    var locUser = JSON.parse(localStorage.getItem(localUser));
    var addPracHS = locUser.gamemath.add.practice;
    var addBattHS = locUser.gamemath.add.battle;
    var subPracHS = locUser.gamemath.sub.practice;
    var subBattHS = locUser.gamemath.sub.battle;
    var mulPracHS = locUser.gamemath.mul.practice;
    var mulBattHS = locUser.gamemath.mul.battle;
    var divPracHS = locUser.gamemath.div.practice;
    var divBattHS = locUser.gamemath.div.battle;
    var ranPracHS = locUser.gamemath.ran.practice;
    var ranBattHS = locUser.gamemath.ran.battle;
    console.log('locuser',addPracHS);
    return (
      <main className="page-main">
        <h1>Statistics</h1>
        <span className="active">View Statistics</span>
        <Link to='/creatures' className='stats-btn'> View Creatures</Link>
        <div className="stat-list">
          <div className="stat-section">
            <h2>Addition</h2>
            <h4>Practice High Score: {addPracHS}</h4>
            <h4>Battle High Score: {addBattHS}</h4>
          </div>
          <div className="stat-section">
            <h2>Subtraction</h2>
            <h4>Practice High Score: {subPracHS}</h4>
            <h4>Battle High Score: {subBattHS}</h4>
          </div>
          <div className="stat-section">
            <h2>Multiplication</h2>
            <h4>Practice High Score: {mulPracHS}</h4>
            <h4>Battle High Score: {mulBattHS}</h4>
          </div>
          <div className="stat-section">
            <h2>Division</h2>
            <h4>Practice High Score: {divPracHS}</h4>
            <h4>Battle High Score: {divBattHS}</h4>
          </div>
          <div className="stat-section">
            <h2>Random</h2>
            <h4>Practice High Score: {ranPracHS}</h4>
            <h4>Battle High Score: {ranBattHS}</h4>
          </div>
        </div>
      </main>
    );
  }
}

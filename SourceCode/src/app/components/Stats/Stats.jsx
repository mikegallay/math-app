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
    let hidden = true;
    this.state = {hidden};

    //check current high score
    // localStorage.setItem(localUser, JSON.stringify(existingData));
    // var locUser = JSON.parse(localStorage.getItem(localUser));
    // console.log('main',locUser, (locUser));

  }

  componentWillMount(){
    //hide the layout until the css is loaded
    let hider = setTimeout(() => {
      let hidden = false
      this.setState({hidden});
    }, 1000)
  }

  render() {
    var locUser = JSON.parse(localStorage.getItem(localUser));
    var addTrainHS = locUser.gamemath.add.training;
    var addBatt1HS = locUser.gamemath.add.battle1;
    var addBatt2HS = locUser.gamemath.add.battle2;
    var subTrainHS = locUser.gamemath.sub.training;
    var subBatt1HS = locUser.gamemath.sub.battle1;
    var subBatt2HS = locUser.gamemath.sub.battle2;
    var mulTrainHS = locUser.gamemath.mul.training;
    var mulBatt1HS = locUser.gamemath.mul.battle1;
    var mulBatt2HS = locUser.gamemath.mul.battle2;
    var divTrainHS = locUser.gamemath.div.training;
    var divBatt1HS = locUser.gamemath.div.battle1;
    var divBatt2HS = locUser.gamemath.div.battle2;
    var ranTrainHS = locUser.gamemath.ran.training;
    var ranBattHS = locUser.gamemath.ran.battle;
    // console.log('locuser',addPracHS);

    let opacity = (!this.state.hidden)?1:0
    let styles = {opacity};

    return (
      <div className="stats main">
        <div className="main-fade" style={styles}>
          <div className="wrapper">
            <h1>Statistics</h1>
            <Link to='/navigation' className='stats-btn'> Main Menu </Link>
            <span className="active">View Statistics</span>
            <Link to='/creatures' className='stats-btn'> View Creatures</Link>
            <div className="stat-list">
              <div className="stat-section">
                <h2>Addition</h2>
                <h4>Training High Score: {addTrainHS}</h4>
                <h4>Level 1 High Score: {addBatt1HS}</h4>
                <h4>Level 2 High Score: {addBatt2HS}</h4>
              </div>
              <div className="stat-section">
                <h2>Subtraction</h2>
                <h4>Training High Score: {subTrainHS}</h4>
                <h4>Level 1 High Score: {subBatt1HS}</h4>
                <h4>Level 2 High Score: {subBatt2HS}</h4>
              </div>
              <div className="stat-section">
                <h2>Multiplication</h2>
                <h4>Training High Score: {mulTrainHS}</h4>
                <h4>Level 1 High Score: {mulBatt1HS}</h4>
                <h4>Level 2 High Score: {mulBatt2HS}</h4>
              </div>
              <div className="stat-section">
                <h2>Division</h2>
                <h4>Training High Score: {divTrainHS}</h4>
                <h4>Level 1 High Score: {divBatt1HS}</h4>
                <h4>Level 2 High Score: {divBatt2HS}</h4>
              </div>
              <div className="stat-section">
                <h2>Random</h2>
                <h4>Final Battle High Score: {ranBattHS}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

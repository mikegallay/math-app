/**
 * Streak component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';
import star from '../../images/star.png';

import './Streak.scss';

export default class Streak extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    /*<div id="streak" className={`streak-wrapper ${this.props.correct}`}>
      <span className="streak-count">{this.props.streak}</span>
    </div>*/
  }

  calculateStreak(i){
    let active = "";
    let streak = this.props.streak;
    let target = this.props.streakTarget;
    let multiplier = Math.floor(streak/target)

    if (streak>=target){
      if (i <= (streak-(multiplier*target))) return "active"
    } else {
      if (streak >= i ) return "active"
    }
    return active
  }

  render() {
    let i = 0

    let streaks = []
    for (let i = 1; i <= this.props.streakTarget; i++) {

      streaks.push(<div className={`streak ${this.calculateStreak(i)}`} id={i} key={i} />);
    }
    //<div className={`streak-count ${this.props.correct}`}>{this.props.streak}</div>
    return (
      <div className="streak-wrapper">
        {streaks}
      </div>
    );
  }
}

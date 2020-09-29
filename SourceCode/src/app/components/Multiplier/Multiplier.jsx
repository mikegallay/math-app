/**
 * Multiplier component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';

import streak from '../../images/streak.png'

import './Multiplier.scss';

export default class Multiplier extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  calculateMultiplier(i){
    let active = "";
    let streak = this.props.streak;
    let target = this.props.streakTarget;
    let multiplier = Math.floor(streak/target)+1
    if (i<=multiplier){
      
      active = "active"
    }
    return active
  }

  render() {
    let i = 0

    let mults = []

    for (let i = 1; i <= 5; i++) {
      mults.push(<div className={`mult ${this.calculateMultiplier(i)}`} id={i} key={i} />);
    }

    let status = (this.props.streak != 0 && this.props.streak%this.props.streakTarget==0)?'level-up':''

    return (
      <div className={`multiplier-wrapper ${status}`}>
        {mults}
      </div>
    );
  }

}

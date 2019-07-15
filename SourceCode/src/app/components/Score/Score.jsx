/**
 * Equation component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';

import './Score.scss';

export default class Score extends React.Component {
  constructor(props) {
    super(props);
  }

  inactiveScore(score){
    let zeros = '000000';
    if (score > 0){
      let scoreLength = zeros.length - score.toString().length
      zeros = ''

      for (let i=0;i<scoreLength;i++){
        zeros += '0'
      }
    }
    return zeros
  }

  render() {
    // console.log('hp',this.props.hitpoints,this.props.score);
    let score = this.props.score;
    let inactiveScore = this.inactiveScore(this.props.score)
    if (this.props.gamemode=='battle') {
      score = this.props.hitpoints - this.props.score;
      if (this.props.score >= this.props.hitpoints) score = "VICTORY"
      inactiveScore = '';
    }
    return (
      <div className="score-wrapper">
        <span className="inactive">{inactiveScore}</span>{score==0 ? '' : score}
      </div>
    );
  }
}

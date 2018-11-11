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

    this.state = {};
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
    return (
      <div className="score-wrapper">
        <span className="inactive">{this.inactiveScore(this.props.score)}</span>{this.props.score==0 ? '' : this.props.score}
      </div>
    );
  }
}

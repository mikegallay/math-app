/**
 * ProgressBar component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';

import './ProgressBar.scss';

export default class ProgressBar extends React.Component {
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
    console.log('progress',this.props.progressTotal,this.props.progressLeft);
    // let score = this.props.score;
    // let inactiveScore = this.inactiveScore(this.props.score)
    // if (this.props.gamemode=='battle') {
    //   score = this.props.hitpoints - this.props.score;
    //   if (this.props.score >= this.props.hitpoints) score = "VICTORY"
    //   inactiveScore = '';
    // }
    //
    //
    let pT = this.props.progressTotal;
    let pL = this.props.progressLeft;
    let width = ((pT - pL) / pT)*100 +"%";
    let styles = {width}

    return (
      <div className="progress-wrapper">
        <div className="progress-back"></div>
        <div style={styles} className="progress-front"></div>
      </div>
    );
  }
}

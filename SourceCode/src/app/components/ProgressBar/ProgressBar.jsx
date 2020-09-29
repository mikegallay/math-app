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
      //    = '';
    // }
    //
    //
    let pT = this.props.progressTotal;
    let pL = this.props.progressLeft;
    let width = ((pT - pL) / pT)*100 +"%";
    let styles = {width}
    let i = 0

    let dividers = []

    for (let i = 1; i <= pT+1; i++) {
      dividers.push(<div className={`divider ${(i==1 || i==pT+1)?"bookends":""}`} id={i} key={i} />);
    }

    let dividerWrapper = <div className="dividers">
      {dividers}
    </div>

    return (
      <div className={`progress-wrapper ${this.props.gamemode}`}>
        <div className="progress-back"></div>
        <div style={styles} className="progress-front"></div>
        {(this.props.gamemode == 'training') ? dividerWrapper : ''}
      </div>
    );
  }
}

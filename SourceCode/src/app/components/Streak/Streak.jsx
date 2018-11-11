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

  render() {
    return (
      <div className="streak-wrapper">
        <div className='streak-bg'><img className={this.props.correct?'active':''} src={star} width='40' height='40'/></div>
        <div className={`streak-count ${this.props.correct}`}>{this.props.streak}</div>
      </div>
    );
  }
}

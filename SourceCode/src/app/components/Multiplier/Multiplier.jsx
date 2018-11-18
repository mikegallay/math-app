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

  render() {
    let status = (this.props.streak != 0 && this.props.streak%5==0)?'level-up':''

    return (
      <div className={`multiplier-wrapper ${status}`}>{this.props.multiplier}x</div>
    );
  }

}

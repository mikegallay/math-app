/**
 * Multiplier component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';

import './Multiplier.scss';

export default class Multiplier extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="multiplier-wrapper">{this.props.multiplier}x</div>
    );
  }

}

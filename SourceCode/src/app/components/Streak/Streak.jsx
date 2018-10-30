/**
 * Streak component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';

import './Streak.scss';

export default class Streak extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="streak-wrapper">
        <span className="streak-count">{this.props.streak}</span>
      </div>
    );
  }
}

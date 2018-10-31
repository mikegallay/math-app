/**
 * HealthBlock component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';

import './HealthBlock.scss';

export default class HealthBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={`health-block ${this.props.status}`}></div>
    );
  }
}

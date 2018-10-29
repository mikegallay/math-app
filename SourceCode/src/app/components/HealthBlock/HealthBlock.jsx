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
    console.log('p',props);
    this.state = {};
  }

  render() {
    return (
      <div className={`health-block ${this.props.status}`}></div>
    );
  }
}

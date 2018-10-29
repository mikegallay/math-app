/**
 * Health component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';

import './Health.scss';
import HealthBlock from '../HealthBlock/HealthBlock';

export default class Health extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="health-wrapper">
        <HealthBlock/>
        <HealthBlock/>
        <HealthBlock/>
        <HealthBlock status={'muted'}/>
        <HealthBlock status={'muted'}/>
      </div>
    );
  }
}

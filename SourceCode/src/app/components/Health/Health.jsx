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

    this.state = {
    };
  }

  render() {
    return (

      <div className="health-wrapper">
        <HealthBlock status={this.props.health<1?'inactive':''}/>
        <HealthBlock status={this.props.health<2?'inactive':''}/>
        <HealthBlock status={this.props.health<3?'inactive':''}/>
        <HealthBlock status={this.props.health<4?'inactive':''}/>
        <HealthBlock status={this.props.health<5?'inactive':''}/>
      </div>
    );
  }
}

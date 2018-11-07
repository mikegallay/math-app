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

  buildHealth(){
    var bars = [];
    for (var i = 0; i < this.props.fullHeath; i++) {
      bars.push(i+1);
    }

    return bars;

  }

  render() {
    let bars = []
    for (var i = 1; i < this.props.fullHeath+1; i++) {
      bars.push(<HealthBlock key={i} status={this.props.health<i?'inactive':''} />);
    }

    return (
      <div className='health-wrapper'>
        {bars}
    </div>
    );
  }
}

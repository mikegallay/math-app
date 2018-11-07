/**
 * Equation component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';
import Score from '../Score/Score';
import Health from '../Health/Health';
import Multiplier from '../Multiplier/Multiplier';
import Streak from '../Streak/Streak';

import './ScoreBoard.scss';

export default class ScoreBoard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="scoreboard-wrapper">
        <Health health={this.props.health} fullHeath={this.props.health}/>
        <Streak correct={this.props.correct} streak={this.props.streak}/>
        <Multiplier multiplier={this.props.multiplier}/>
        <Score score={this.props.score}/>
      </div>
    );
  }
}
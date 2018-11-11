/**
 * ScoreBoard component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';
import Score from '../Score/Score';
import Health from '../Health/Health';
import Countdown from '../Countdown/Countdown';
import Multiplier from '../Multiplier/Multiplier';
import Streak from '../Streak/Streak';
import { Link } from 'react-router-dom';

import './ScoreBoard.scss';

export default class ScoreBoard extends React.Component {
  constructor(props) {
    super(props);

    const {gamemode} = props

    console.log('gm',props.gamemode)

    this.state = {}
  }

  render() {
    let gamemode = <Countdown gameover={this.props.gameover} onTimeExpired={this.props.onTimeExpired}/>

    if (this.props.gamemode=='health'){
      gamemode = <Health gameover={this.props.gameover} health={this.props.health} fullHeath={this.props.fullHealth}/>
    }
    return (
      <div className="scoreboard-wrapper">
        <Link to='/' className='back-btn'>&#8592;</Link>
        {gamemode}
        <Streak correct={this.props.correct} streak={this.props.streak}/>
        <Multiplier multiplier={this.props.multiplier}/>
        <Score score={this.props.score}/>
      </div>
    );
  }
}

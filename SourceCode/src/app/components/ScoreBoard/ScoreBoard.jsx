/**
 * ScoreBoard component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';
import Score from '../Score/Score';
import ProgressBar from '../ProgressBar/ProgressBar';
import Health from '../Health/Health';
import Countdown from '../Countdown/Countdown';
import Multiplier from '../Multiplier/Multiplier';
import Streak from '../Streak/Streak';
import { Link } from 'react-router-dom';

import './ScoreBoard.scss';
import hero from '../../images/hero.png';

export default class ScoreBoard extends React.Component {
  constructor(props) {
    super(props);

    const {gamemode, progressTotal, progressLeft,level} = props

    // console.log('gm',props)

    this.state = {}
  }

  render() {
    //<Link to='/navigation' className='back-btn'><i className="material-icons">backspace</i></Link>
    let chances = ''
    let charging = <Countdown
        modalVisible={this.props.modalVisible}
        ready={this.props.ready}
        restart={this.props.restart}
        gameover={this.props.gameover}
        lifeboost={this.props.lifeboost}
        onTimeExpired={this.props.onTimeExpired}/>

    if (this.props.gamemode == 'training'){
      charging = ''
      chances = <Health gameover={this.props.gameover} health={this.props.health} fullHeath={this.props.fullHealth}/>
    }
    return (
      <div className={`scoreboard-wrapper ${(this.props.gameover)?'gameover':''}`}>
        <div className="main-scores">
          <Link to='/navigation'><img src={hero} height="60" width="60"/></Link>
          <div className="hero-stats">
            <Streak streakTarget={this.props.streakTarget} correct={this.props.correct} streak={this.props.streak}/>
            <Multiplier streakTarget={this.props.streakTarget} streak={this.props.streak} multiplier={this.props.multiplier}/>
            {chances}
            <Score gamemode={this.props.gamemode} hitpoints={this.props.hitpoints} score={this.props.score}/>
          </div>
        </div>
        <div className="wizard-stats">
          <ProgressBar gamemode={this.props.gamemode} progressTotal={this.props.progressTotal} progressLeft={this.props.progressLeft}/>
          {charging}
        </div>
      </div>
    );
  }
}

/**
 * Countdown component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';

import './Countdown.scss';
// import AudioCountdown from '../AudioCountdown/AudioCountdown';
import ReactHowler from 'react-howler'

const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;
import wiz0 from '../../images/wizard0.png';
import wiz1 from '../../images/wizard1.png';

const COLOR_CODES = {
  info: {
    color: "green",
    wizard: wiz0
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD,
    wizard: wiz1
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD,
    wizard: wiz1
  }
};

export default class Countdown extends React.Component {
  constructor(props) {
    super(props);

    let gamelength = 30
    if (this.props.lifeboost) gamelength *= 1.2

    this.state = {
      timePassed:0,
      time: {},
      seconds: gamelength, gamelength,
      timerStarted: false,
      wizImage: wiz0
    };

    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  componentDidMount() {
    let time = this.secondsToTime(this.state.seconds);

    this.setState({ time });

    // this.startTimer()
    this._ismounted = true;
  }

  componentWillUnmount() {
     this._ismounted = false;
  }

  componentDidUpdate(nextProps){
    // console.log('s',(this.props),this.state.timerStarted);
    if (this.props.ready && !this.state.timerStarted && !this.props.gameover) {this.startTimer();}
    if (this.props.restart && !this.state.timerStarted) {
      clearInterval(this.timer)
      // this.setCircleDasharray();
      this.startTimer();
    }
    // if (this.props.gameover) {console.log('cd gameover'); clearInterval(this.timer);}
    // if (!this.props.gameover && this.props.restart)console.log('testingitup',this.props);
    // if (!this.props.modalVisible && this.props.gameover) this.startTimer();
  }

  restart(){
    this.setState({seconds: this.state.gamelength})
    this.startTimer();
  }

  startTimer() {
    console.log('start timer');
    this.setState({ timerStarted: true });
    if (this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  secondsToTime(secs){
    let hours = Math.floor(secs / (60 * 60))

    let divisor_for_minutes = secs % (60 * 60)
    let minutes = Math.floor(divisor_for_minutes / 60)

    let divisor_for_seconds = divisor_for_minutes % 60
    let seconds = Math.ceil(divisor_for_seconds)

    if (seconds < 10) seconds = '0' + seconds

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }

  setWizardImage() {
    let tL = this.state.seconds
    const { alert, warning, info } = COLOR_CODES;
    if (tL <= alert.threshold) {
      return alert.wizard
    } else if (tL <= warning.threshold) {
      return warning.wizard
    }
    return info.wizard
  }

  setRemainingPathColor() {
    let tL = this.state.seconds
    const { alert, warning, info } = COLOR_CODES;
    if (tL <= alert.threshold) {
      return alert.color
    } else if (tL <= warning.threshold) {
      return warning.color
    }
    return info.color
  }

  setCircleDasharray() {

    if (this.state.seconds == this.state.gamelength){
      return '0 283';
    }else{
      return `${(
        this.calculateTimeFraction() * FULL_DASH_ARRAY
      ).toFixed(0)} 283`;
  }

  }

  calculateTimeFraction() {
    const rawTimeFraction = (this.state.gamelength - this.state.seconds) / this.state.gamelength;
    return rawTimeFraction - (1 / this.state.gamelength) * (1 - rawTimeFraction);
}

  countDown() {
    // console.log('countdown',this.state.seconds);

    // if the component was unmounted, kill timer
    if (!this._ismounted) {
      clearInterval(this.timer)
      return;
    }

    // Remove one second, set state so a re-render happens.

    let seconds = this.state.seconds - 1;

    // this.setCircleDasharray();
    this.setRemainingPathColor(this.state.gamelength - seconds);

    //set timer to 0 so it will reset if the wizard is defeated
    if (this.props.gameover) seconds = 0;
    this.setState({
      seconds,
      time: this.secondsToTime(seconds)
    });

    // Check if we're at zero.
    if (seconds == 0) {
      clearInterval(this.timer)

      this.timer = setTimeout(()=>{
        this.setState({
          time: this.secondsToTime(this.state.gamelength),
          seconds: this.state.gamelength,
          timerStarted: false
        });
        this.props.onTimeExpired()

      }, 1000)
    }
  }

  render() {
    let final5 = (this.state.seconds<6 && !this.props.gameover )
    //{this.state.time.m}:{this.state.time.s}
    return(
      <div className={`countdown-wrapper ${(this.state.seconds<6)?'final-5':''}`}>

        <ReactHowler
        src='/audio/countdown.mp3'
        playing={final5}
      />
      <div className="base-timer">
        <img className="wizard-image" src={this.setWizardImage()} width="80" height="80"/>
        <svg className="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <g className="base-timer__circle">
            <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
            <path
              id="base-timer-path-remaining"
              stroke-dasharray="283"
              className={`base-timer__path-remaining ${this.setRemainingPathColor()}`}
              strokeDasharray={this.setCircleDasharray()}
              d="
                M 50, 50
                m -45, 0
                a 45,45 0 1,0 90,0
                a 45,45 0 1,0 -90,0
              "
            ></path>
          </g>
        </svg>
        </div>
      </div>
    );
  }
}

/**
 * Countdown component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';

import './Countdown.scss';
// import AudioCountdown from '../AudioCountdown/AudioCountdown';
import ReactHowler from 'react-howler'

export default class Countdown extends React.Component {
  constructor(props) {
    super(props);

    let gamelength = 10

    this.state = {
      time: {},
      seconds: gamelength, gamelength,
      timerStarted: false
    };

    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);

    this.setState({ time: timeLeftVar });

    // this.startTimer()
    this._ismounted = true;
  }

  componentWillUnmount() {
     this._ismounted = false;
  }

  componentDidUpdate(nextProps){
    console.log('s',(this.props));
    if (this.props.ready && !this.state.timerStarted && !this.props.gameover) {this.startTimer();console.log('here',this.state.timerStarted);}
    if (this.props.restart && !this.state.timerStarted) {
      clearInterval(this.timer)
      console.log('here3');
      this.startTimer();
    }
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

  countDown() {
    // console.log('countdown',this.state.seconds);

    // if the component was unmounted, kill timer
    if (!this._ismounted) {
      clearInterval(this.timer)
      return;
    }

    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      seconds,
      time: this.secondsToTime(seconds)
    });

    // Check if we're at zero.
    if (seconds == 0) {
      clearInterval(this.timer)
    this.props.onTimeExpired()
      this.timer = setTimeout(()=>{
        this.setState({
          time: this.secondsToTime(this.state.gamelength),
          seconds: this.state.gamelength,
          timerStarted: false
        });

      }, 1000)
    }
  }

  render() {

    let final5 = (this.state.seconds<6 && !this.props.gameover )

    return(
      <div className={`countdown-wrapper ${(this.state.seconds<6)?'final-5':''}`}>
        {this.state.time.m}:{this.state.time.s}
        <ReactHowler
        src='http://math.michaelgallay.com/audio/countdown.mp3'
        playing={final5}
      />
      </div>
    );
  }
}

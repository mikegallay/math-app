/**
 * Countdown component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';

import './Countdown.scss';
import AudioCountdown from '../AudioCountdown/AudioCountdown';

export default class Countdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      time: {}, seconds: 6
    };

    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
    this.startTimer()
  }

  startTimer() {
    if (this.timer == 0 && this.state.seconds > 0) {
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
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });

    // Check if we're at zero.
    if (seconds == 0) {
      clearInterval(this.timer)
      this.timer = setTimeout(this.props.onTimeExpired, 1000)
    }
  }

  render() {
    let final5 = (this.state.seconds<6 && !this.props.gameover )

    return(
      <div className={`countdown-wrapper ${(this.state.seconds<6)?'final-5':''}`}>
        {this.state.time.m}:{this.state.time.s}
        <AudioCountdown playing={final5}/>
      </div>
    );
  }
}

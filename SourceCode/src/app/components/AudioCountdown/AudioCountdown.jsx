
import React from 'react';

import Sound from 'react-sound'

import soundfile from '../../audio/countdown.mp3';

export default class AudioCountdown extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
    };
  }
  render() {

    let status = Sound.status.STOPPED;
    if (this.props.playing) status = Sound.status.PLAYING;

    return (
      <Sound
        autoload={true}
        url={soundfile}
        playStatus={status}
        onLoading={this.handleSongLoading}
        onPlaying={this.handleSongPlaying}
        onFinishedPlaying={this.handleSongFinishedPlaying}
      />
    );
   }
 }

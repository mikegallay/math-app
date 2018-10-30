/**
 * Another component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';

import Equation from '../Equation/Equation';
import ScoreBoard from '../ScoreBoard/ScoreBoard';
import Answers from '../Answers/Answers';

import './GamePlay.scss';

export default class GamePlay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <main className="gameplay-wrapper">
        <ScoreBoard data={{mode:this.props.data.mode}}/>
        <Equation data={{version:this.props.data.version}}/>
        <Answers/>
      </main>
    );
  }
}

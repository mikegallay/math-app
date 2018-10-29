/**
 * Another component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';
import { Link } from 'react-router-dom';

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
        <Link to="/">Main route</Link> | Play Game
        <ScoreBoard/>
        <Equation/>
        <Answers/>
      </main>
    );
  }
}

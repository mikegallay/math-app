/**
 * Addition component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';

import './Addition.scss';
// import GamePlay from '../GamePlay/GamePlay';
import Equation from '../Equation/Equation';
import ScoreBoard from '../ScoreBoard/ScoreBoard';
import Answers from '../Answers/Answers';


export default class Addition extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      score:100

    };
  }

  onAnswer(correct){
    console.log('anssered correctly? ',correct);
    if (correct){
      let score = this.state.score + 100
      this.setState({
        score
      })
    }

  }



  render() {
    return (
      <div>
        <ScoreBoard score={this.state.score} mode="health"/>
        <Equation version="add"/>
        <Answers onAnswer={(correct)=>{this.onAnswer(correct)}}/>
      </div>
    );
  }
}

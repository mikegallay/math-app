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
      score:0,
      streak: 0,
      answered: false,
      multiplier: 1
    };
  }

  onAnswer(correct){
    console.log('answered correctly? ',correct);
    let answered = true;
    let multiplier = this.state.multiplier;
    if (correct){

      let streak = this.state.streak + 1
      multiplier = Math.floor(streak/10)+1
      let score = this.state.score + (100 * multiplier)
      this.setState({
        score,streak,answered,multiplier
      })
    }else{
      multiplier = 1;
      this.setState({
        streak:0,answered,multiplier
      })
    }
  }

  render() {
    return (
      <div>
        <ScoreBoard multiplier={this.state.multiplier} streak={this.state.streak} score={this.state.score} mode="health"/>
        <Equation version="add"/>
        <Answers answered={this.state.answered} onAnswer={(correct)=>{this.onAnswer(correct)}}/>
      </div>
    );
  }
}

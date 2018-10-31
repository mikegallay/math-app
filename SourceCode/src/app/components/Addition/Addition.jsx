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

    let range = 10;
    let randOne = this.rand(-5,5)
    let randTwo = this.rand(-5,5)
    if (randOne == 0) randOne++
    if (randTwo == 0) randTwo++
    if (randOne == randTwo) randTwo++

    this.state = {
      score:0,
      streak: 0,
      answered: false,
      multiplier: 1,
      health: 5,
      fullHealth: 5,
      range: range,
      numOne:this.rand(0,range),
      numTwo:this.rand(0,range),
      randOne,
      randTwo,
      timerID:0
    };
  }

  rand(min,max){
    return Math.floor(Math.random() * ((max-min)+1) + min)
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
      let health = this.state.health - 1
      this.setState({
        streak:0,answered,multiplier,health
      })
      if (health==0){
        console.log("Game Over");
      }
    }

    if (this.state.timerid) {
      clearTimeout(this.state.timerid);
    }

    this.state.timerid = setTimeout(() => {
      this.nextQuestion()
    }, 1000);
      }

  nextQuestion(){
    let el = document.getElementById('selected')
    el.setAttribute('id','')
    let answered = false
    let randOne = this.rand(-5,5)
    let randTwo = this.rand(-5,5)
    if (randOne == 0) randOne++
    if (randTwo == 0) randTwo++
    if (randOne == randTwo) randTwo++
    this.setState({
      answered,
      randOne,
      randTwo,
      numOne:this.rand(0,this.state.range),
      numTwo:this.rand(0,this.state.range)
    })
  }

  render() {
    /*const isAnswered = this.state.answered;
    let answers
    if (isAnswered) {
      answers = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      answers = <LoginButton onClick={this.handleLoginClick} />;
    }*/
    return (
      <div className="page-main">
        <ScoreBoard
          multiplier={this.state.multiplier}
          streak={this.state.streak}
          score={this.state.score}
          mode="health"
          fullHealth={this.state.fullHealth}
          health={this.state.health}
        />

        <Equation
          version="add"
          numOne={this.state.numOne}
          numTwo={this.state.numTwo}
        />

        <Answers
          answered={this.state.answered}
          onAnswer={(correct)=>{this.onAnswer(correct)}}
          numOne={this.state.numOne}
          numTwo={this.state.numTwo}
          randOne={this.state.randOne}
          randTwo={this.state.randTwo}
        />
      </div>
    );
  }
}

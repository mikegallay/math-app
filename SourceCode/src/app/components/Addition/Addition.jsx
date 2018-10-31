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
      multiplier: 1,
      health: 5,
      fullHealth: 5,
      numOne:this.rand(0,9),
      numTwo:this.rand(0,9),
      randOne:this.rand(-5,5),
      randTwo:this.rand(-5,5),
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
    this.setState({
      answered,numOne:this.rand(0,9),numTwo:this.rand(0,9)
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
      <div>
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

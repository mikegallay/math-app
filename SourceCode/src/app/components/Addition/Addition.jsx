/**
 * Addition component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';

import './Addition.scss';
import Equation from '../Equation/Equation';
import ScoreBoard from '../ScoreBoard/ScoreBoard';
import Answers from '../Answers/Answers';
import Modal from '../Modal/Modal';


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
      correct:null,
      answered: false,
      multiplier: 1,
      health: 5,
      fullHealth: 5,
      modalVisible:'init false',
      modalTitle:'Game Over',
      modalBody:'you are not good',
      nextQuestionDelay:500,
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

  onAnswer(isCorrect){
    // prevent multiple button presses for same unanswer
    if (this.state.answered) return;

    let answered = true;
    let correct = isCorrect;
    let multiplier = this.state.multiplier;

    if (isCorrect){
      let streak = this.state.streak + 1
      multiplier = Math.floor(streak/5)+1
      let score = this.state.score + (100 * multiplier)
      this.setState({
        score,streak,answered,multiplier,correct,modalVisible:false
      })
    }else{
      multiplier = 1;
      let health = this.state.health - 1
      this.setState({
        streak:0,answered,multiplier,health,correct
      })
    }

    if (this.state.timerid) {
      clearTimeout(this.state.timerid);
    }

    this.state.timerid = setTimeout(() => {
      if (this.state.health <= 0){
        console.log("Game Over");
        let modalBody = 'Your score:<br><h3>' + this.state.score + '</h3>Practice makes perfect. Why don’t you try again?'
        this.setState({
          modalVisible:true,
          modalTitle:'You’ve run out of health',
          modalBody
        })
      }else{
        this.nextQuestion()
      }
    }, this.state.nextQuestionDelay);
      }

  nextQuestion(){
    //remove selected id from chosen answer
    let el = document.getElementById('selected')
    el.setAttribute('id','')

    let correct = null
    let answered = false
    let randOne = this.rand(-5,5)
    let randTwo = this.rand(-5,5)
    if (randOne == 0) randOne++
    if (randTwo == 0) randTwo++
    if (randOne == randTwo) randTwo++
    if (randTwo == 0) randTwo++

    this.setState({
      answered,
      correct,
      randOne,
      randTwo,
      numOne:this.rand(0,this.state.range),
      numTwo:this.rand(0,this.state.range)
    })
  }

  closeModal(){
    this.setState({
      modalVisible:false
    })
  }

  render() {
    return (
      <div className="page-main">
        <ScoreBoard
          multiplier={this.state.multiplier}
          streak={this.state.streak}
          correct={this.state.correct}
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
        <Modal
          title={this.state.modalTitle}
          body={this.state.modalBody}
          score={this.state.score}
          visible={this.state.modalVisible}
          closeModal={()=>{this.closeModal()}}
        />
      </div>
    );
  }
}

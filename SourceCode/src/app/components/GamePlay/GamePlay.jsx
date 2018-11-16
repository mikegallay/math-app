/**
 * GamePlay component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';
import ReactHowler from 'react-howler'

import './GamePlay.scss';
import Equation from '../Equation/Equation';
import ScoreBoard from '../ScoreBoard/ScoreBoard';
import Answers from '../Answers/Answers';
import Modal from '../Modal/Modal';

export default class GamePlay extends React.Component {
  constructor(props) {
    super(props);

    const {operator, gamemode, constant, randomize} = props.location.state

    let nextQuestionDelay = 50
    if (gamemode == 'health') nextQuestionDelay = 1000
    let range = 10
    let fullHealth = 3
    let randOne = this.rand(-5,5)
    let randTwo = this.rand(-5,5)
    if (randOne == 0) randOne++
    if (randTwo == 0) randTwo++
    if (randOne == randTwo) randTwo++
    if (randTwo == 0) randTwo++

    this.state = {
      score:0,
      streak: 0,
      correct:null,
      answered: false,
      multiplier: 1,
      gameover: false,
      restart:false,
      health: fullHealth,
      fullHealth,
      operator,
      gamemode,
      constant,
      randomize,
      modalVisible:'init false',
      modalTitle:'Game Over',
      modalBody:'you are not good',
      nextQuestionDelay,
      range: range,
      numOne:constant?constant:this.rand(0,range),
      numTwo:this.rand(0,range),
      randOne,
      randTwo,
      soundFX:null,
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
      let soundFX = 'right'
      this.setState({
        soundFX,score,streak,answered,multiplier,correct,modalVisible:false
      })
    }else{
      multiplier = 1;
      let health = this.state.health - 1
      let soundFX = 'wrong'
      this.setState({
        soundFX,streak:0,answered,multiplier,health,correct
      })
    }

    if (this.state.timerid) {
      clearTimeout(this.state.timerid);
    }

    this.state.timerid = setTimeout(() => {
      if (this.state.health <= 0 && this.state.gamemode == 'health'){
        console.log("Game Over");
        let modalBody = 'Your score:<br><h3>' + this.state.score + '</h3>Practice makes perfect.<br/>Why don’t you try again?'
        this.setState({
          gameover: true,
          modalVisible:true,
          modalTitle:'You’ve run out of health',
          modalBody
        })
      }else{
        let operator = this.state.operator
        let operators = ['add','sub','mul','div']
        if (this.state.randomize) operator = operators[this.rand(0,operators.length-1)]
        this.setState({
          operator,soundFX:null
        })

        this.nextQuestion()
      }
    }, this.state.nextQuestionDelay);
  }

  timeExpired(){
    console.log("Time Expired");
    let modalBody = 'Your score:<br><h3>' + this.state.score + '</h3>Practice makes perfect.<br/>Why don’t you try again?'
    this.setState({
      modalVisible:true,
      modalTitle:'Time is up!',
      gameover: true,
      modalBody
    })
  }

  nextQuestion(){

    //remove selected id from chosen answer
    let el = document.getElementById('selected')
    if (el) el.setAttribute('id','')

    let correct = null
    let answered = false
    let randOne = this.rand(-5,5)
    let randTwo = this.rand(-5,5)
    if (randOne == 0) randOne++
    if (randTwo == 0) randTwo++
    if (randOne == randTwo) randTwo++
    if (randTwo == 0) randTwo++

    let numOne = this.state.constant?this.state.constant:this.rand(0,this.state.range)
    let numTwo = this.rand(0,this.state.range)

    this.setState({
      answered,
      correct,
      randOne,
      randTwo,
      numOne,
      numTwo,
      soundFX:null,
      restart:false
    })
  }

  closeModal(){
    this.setState({
      modalVisible:false,
      answered:false,
      correct:null,
      health:this.state.fullHealth,
      streak:0,
      multiplier:1,
      score:0,
      gameover:false,
      restart:true
    })

    this.state.timerid = setTimeout(() => {
      this.nextQuestion()
    }, 300);


  }

  calculateEquation(){
    let numOne = this.state.numOne
    let numTwo = this.state.numTwo
    let answer = numOne + numTwo

    if (this.state.operator == 'add'){
        return [numOne,numTwo,answer]
    } else if (this.state.operator == 'sub'){
        answer = numOne
        numOne = (this.state.numOne + this.state.numTwo)
        return [numOne,numTwo,answer]
    } else if (this.state.operator == 'mul'){
        answer = this.state.numOne * this.state.numTwo
        return [numOne,numTwo,answer]
    } else if (this.state.operator == 'div'){
        answer = numOne
        numOne = (this.state.numOne * this.state.numTwo)
        return [numOne,numTwo,answer]
    }
  }

  render() {
    let rightFX = (this.state.soundFX == 'right' && this.state.correct != null) ? true : false;
    let wrongFX = (this.state.soundFX == 'wrong' && this.state.correct != null) ? true : false;

    let equation = this.calculateEquation()
    let numOne = equation[0]
    let numTwo = equation[1]
    let answer = equation[2]

    return (
      <div className="page-main">

        <ReactHowler
          src='http://michaelgallay.com/playground/math/audio/right.mp3'
          playing={rightFX}
        />

        <ReactHowler
          src='http://michaelgallay.com/playground/math/audio/wrong.mp3'
          playing={wrongFX}
        />

        <ScoreBoard
          onTimeExpired={()=>{this.timeExpired()}}
          multiplier={this.state.multiplier}
          streak={this.state.streak}
          correct={this.state.correct}
          score={this.state.score}
          gamemode={this.state.gamemode}
          gameover={this.state.gameover}
          restart={this.state.restart}
          fullHealth={this.state.fullHealth}
          health={this.state.health}
        />

        <Equation
          operator={this.state.operator}
          numOne={numOne}
          numTwo={numTwo}
        />

        <Answers
          answered={this.state.answered}
          onAnswer={(correct)=>{this.onAnswer(correct)}}
          answer={answer}
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

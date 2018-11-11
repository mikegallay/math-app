/**
 * GamePlay component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';

import './GamePlay.scss';
import Equation from '../Equation/Equation';
import ScoreBoard from '../ScoreBoard/ScoreBoard';
import Answers from '../Answers/Answers';
import Modal from '../Modal/Modal';

import AudioRight from '../AudioRight/AudioRight';
import AudioWrong from '../AudioWrong/AudioWrong';


export default class GamePlay extends React.Component {
  constructor(props) {
    super(props);

    const {operator, gamemode} = props.location.state

    console.log(operator,gamemode)

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
      health: fullHealth,
      fullHealth,
      operator,
      gamemode,
      modalVisible:'init false',
      modalTitle:'Game Over',
      modalBody:'you are not good',
      nextQuestionDelay: 100,
      range: range,
      numOne:this.rand(0,range),
      numTwo:this.rand(0,range),
      randOne,
      randTwo,
      soundFX:'null',
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
      if (this.state.health <= 0){
        console.log("Game Over");
        let modalBody = 'Your score:<br><h3>' + this.state.score + '</h3>Practice makes perfect.<br/>Why don’t you try again?'
        this.setState({
          gameover: true,
          modalVisible:true,
          modalTitle:'You’ve run out of health',
          modalBody
        })
      }else{
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
    el.setAttribute('id','')

    let correct = null
    let answered = false
    let randOne = this.rand(-5,5)
    let randTwo = this.rand(-5,5)
    if (randOne == 0) randOne++
    if (randTwo == 0) randTwo++
    if (randOne == randTwo) randTwo++
    if (randTwo == 0) randTwo++

    let numOne = this.rand(0,this.state.range)
    let numTwo = this.rand(0,this.state.range)

    this.setState({
      answered,
      correct,
      randOne,
      randTwo,
      numOne,
      numTwo
    })
  }

  closeModal(){
    this.setState({
      modalVisible:false,
      answered:false,
      correct:null,
      health:this.state.fullHeath,
      streak:0,
      multiplier:1,
      score:0,
      gameover: false
    })
    this.nextQuestion()
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
    //let wrongFX = (this.state.soundFX == 'wrong' && this.state.correct != null) ? true : false;

    let equation = this.calculateEquation()
    // console.log('equation',equation);
    let numOne = equation[0]
    let numTwo = equation[1]
    let answer = equation[2]

    return (
      <div className="page-main">

        <AudioRight playing={rightFX}/>
        {/* <AudioWrong playing={wrongFX}/> */}

        <ScoreBoard
          onTimeExpired={()=>{this.timeExpired()}}
          multiplier={this.state.multiplier}
          streak={this.state.streak}
          correct={this.state.correct}
          score={this.state.score}
          gamemode={this.state.gamemode}
          gameover={this.state.gameover}
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

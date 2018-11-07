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

import AudioRight from '../AudioRight/AudioRight';
import AudioWrong from '../AudioWrong/AudioWrong';


export default class Addition extends React.Component {
  constructor(props) {
    super(props);

    let range = 10;
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
      health: 5,
      fullHealth: 5,
      operator: 'sub',
      modalVisible:'init false',
      modalTitle:'Game Over',
      modalBody:'you are not good',
      nextQuestionDelay: 1500,
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
      modalVisible:false,
      answered:false,
      correct:null,
      health:5,
      score:0
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
    }
  }

  render() {
    let rightFX = (this.state.soundFX == 'right' && this.state.correct != null) ? true : false;
    //let wrongFX = (this.state.soundFX == 'wrong' && this.state.correct != null) ? true : false;

    let equation = this.calculateEquation()
    console.log('equation',equation);
    let numOne = equation[0]
    let numTwo = equation[1]
    let answer = equation[2]

    return (
      <div className="page-main">

        <AudioRight playing={rightFX}/>
        {/* <AudioWrong playing={wrongFX}/> */}

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

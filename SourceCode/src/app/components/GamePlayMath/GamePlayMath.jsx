/**
 * GamePlayMath component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';
import ReactHowler from 'react-howler'
import {firebaseAuth,ref} from "../../config/constants";

import './GamePlayMath.scss';
import Equation from '../Equation/Equation';
import ScoreBoard from '../ScoreBoard/ScoreBoard';
import Answers from '../Answers/Answers';
import Modal from '../Modal/Modal';

const localUser = "localUser";

const unlockScore = 100;//2500
const unlockDecimal = 100;
const releaseScore = 100;//2500
const requiredAccuracy = 25;//80
const fullHealth = 1;

export default class GamePlayMath extends React.Component {
  constructor(props) {
    super(props);

    const {operator, gamemode, constant, randomize} = props.location.state

    let nextQuestionDelay = 50
    if (gamemode == 'health') nextQuestionDelay = 1000
    let range = 10

    let numbers = this.calculateNumbers(constant,range,operator)
    let equation = this.calculateEquation(numbers.numOne,numbers.numTwo,operator)

    this.state = {
      //unlockScore:100,//2500
      //releaseScore:100,//2500
      //requiredAccuracy:25,//80
      score:0,
      streak: 0,
      correct:null,
      bonus:0,
      ansßwered: false,
      multiplier: 1,
      gameover: false,
      restart:false,
      health: fullHealth,
      numRight:0,
      numWrong:0,
      operator,
      gamemode,
      constant,
      randomize,
      modalVisible:'init false',
      modalTitle:'Game Over',
      modalBody:'Game not started',
      nextQuestionDelay,
      range,
      numbers,
      equation,
      timerID:0,
      rightFX:false,
      wrongFX:false,
      levelFX:false
    };

  }

  rand(min,max){
    return Math.floor(Math.random() * ((max-min)+1) + min)
  }

  stopAudio(){
    this.rightFX.stop()
    this.wrongFX.stop()
    this.levelFX.stop()
  }


  onAnswer(isCorrect){
    // prevent multiple button presses for same unanswer
    if (this.state.answered) return;

    this.stopAudio()

    let answered = true;
    let correct = isCorrect;
    let multiplier = this.state.multiplier;

    if (isCorrect){
      let numRight = this.state.numRight + 1
      let streak = this.state.streak + 1
      multiplier = Math.floor(streak/5)+1
      let levelFX = false
      if (streak%5==0) levelFX=true
      let score = this.state.score + (100 * multiplier)
      this.setState({
        numRight,score,streak,answered,multiplier,correct,modalVisible:false,
        rightFX:true,wrongFX:false,levelFX
      })
    }else{
      let numWrong = this.state.numWrong + 1
      multiplier = 1;
      let health = this.state.health - 1
      this.setState({
        numWrong,streak:0,answered,multiplier,health,correct,
        rightFX:false,wrongFX:true,levelFX:false
      })
    }

    if (this.state.timerid) {
      clearTimeout(this.state.timerid);
    }

    this.state.timerid = setTimeout(() => {
      if (this.state.health <= 0 && this.state.gamemode == 'health'){
        console.log("Game Over");
        let bonus = 0
        let accuracy = Math.round(this.state.numRight / (this.state.numRight + fullHealth) * 100)
        if (this.state.numRight + this.state.numWrong == 0) accuracy = 0
        let modalTitle = 'Keep practicing!'
        let modalBody = 'Your score:<br><h3>' + this.state.score + '</h3><span class="green bold">You got ' + this.state.numRight+ ' correct!</span><br><br><span class="bold">' + accuracy + '% Accuracy</span><br><br>Improve your score and accuracy to unlock the next level.'

        //did they do well enough to unlock the timer round
        if (accuracy >= requiredAccuracy && this.state.score >= unlockScore){

          modalTitle = 'Well done!'
          modalBody = 'Your score:<br><h3>' + this.state.score + '</h3><span class="green bold">You got ' + this.state.numRight+ ' correct!</span><br><br><span class="bold">' + accuracy + '% Accuracy</span><br><br>You’ve proven that you are ready for the next level.'

          // if (this.state.score > this.state.unlockScore){
            bonus = Math.floor(this.state.score/unlockDecimal)
          // }

          var locUser = JSON.parse(localStorage.getItem(localUser))
          // console.log('loc id', locUser.userid);
          var operator = (this.state.randomize) ? 'ran' : this.state.operator
          locUser.gamemath[operator].unlocked = true;

          if (this.state.score > locUser.gamemath[operator].practice){
            locUser.gamemath[operator].practice = this.state.score
          }
          // console.log('loc user', locUser);
          localStorage.setItem(localUser, JSON.stringify(locUser));

          let userRef = ref.ref('/users/' + locUser.userid + '/gamemath/' + operator);
          userRef.set(locUser.gamemath[operator]);
        }

        this.setState({
          gameover: true,
          modalVisible:true,
          modalTitle,
          modalBody,
          rightFX:false,
          wrongFX:false,
          bonus,
          levelFX:false

        })
      }else{
        let operator = this.state.operator
        let operators = ['add','sub','mul','div']
        if (this.state.randomize) operator = operators[this.rand(0,operators.length-1)]
        this.setState({operator})

        this.nextQuestion()
      }
    }, this.state.nextQuestionDelay);
  }

  timeExpired(){
    console.log("Time Expired");
    let accuracy = Math.round(this.state.numRight / (this.state.numRight + this.state.numWrong) * 100)
    let bonus = 0
    if (this.state.numRight + this.state.numWrong == 0) accuracy = 0
    let modalTitle = 'You were defeated!'
    let modalBody = 'Your score:<br><h3>' + this.state.score + '</h3><span class="green bold">' + this.state.numRight+ ' Correct</span> – <span class="red bold">' + this.state.numWrong + ' Wrong</span><br><br><span class="bold">' + accuracy + '% Accuracy</span><br><br>Why don’t you try again?'

    //did they release a monster
    if (accuracy >= requiredAccuracy && this.state.score >= releaseScore){

      modalTitle = 'You unlocked a secret!'
      modalBody = 'Your score:<br><h3>' + this.state.score + '</h3><span class="green bold">You got ' + this.state.numRight+ ' correct!</span><br><br><span class="bold">' + accuracy + '% Accuracy</span><br><br>Click the box to open it.'

      // multiply by 10000 to designate it as a creature in the Bonus component
      bonus = Math.floor(this.state.score/unlockDecimal) * 10000

      //sync data
      var locUser = JSON.parse(localStorage.getItem(localUser))
      // console.log('loc id', locUser.userid);
      var operator = (this.state.randomize) ? 'ran' : this.state.operator
      locUser.gamemath[operator].unlocked = true;

      if (this.state.score > locUser.gamemath[operator].battle){
        locUser.gamemath[operator].battle = this.state.score
      }
      // console.log('loc user', locUser);
      localStorage.setItem(localUser, JSON.stringify(locUser));

      let userRef = ref.ref('/users/' + locUser.userid + '/gamemath/' + operator);
      userRef.set(locUser.gamemath[operator]);
    }

    this.setState({
      modalVisible:true,
      modalTitle,
      modalBody,
      gameover: true,
      bonus,
      rightFX:false,
      wrongFX:false,
      levelFX:false
    })
  }

  clearAnswers(){
    // console.log('clearAnswers');
    let el = document.getElementById('selected')
    if (el) el.setAttribute('id','')
  }

  nextQuestion(){
    //remove selected id from chosen answer
    let el = document.getElementById('selected')
    if (el) el.setAttribute('id','')

    let correct = null
    let answered = false

    let numbers = this.calculateNumbers(this.state.constant,this.state.range,this.state.operator)
    let equation = this.calculateEquation(numbers.numOne,numbers.numTwo,this.state.operator)

    this.setState({
      answered,
      correct,
      numbers,
      equation,
      restart:false
    })

    if (this.state.gamemode == 'health') this.stopAudio()

  }

  closeModal(){
    // console.log('game play closeModal');
    // this.clearAnswers()

    this.setState({
      modalVisible:false,
      answered:false,
      correct:null,
      health:fullHealth,
      streak:0,
      multiplier:1,
      score:0,
      numRight:0,
      numWrong:0,
      gameover:false,
      restart:true
    })

    this.state.timerid = setTimeout(() => {
      this.nextQuestion()
    }, 300);

  }

  calculateNumbers(_constant,_range,_operator){
    let randOne = this.rand(-5,5)
    let randTwo = this.rand(-5,5)
    if (randOne == 0) randOne++
    if (randTwo == 0) randTwo++
    if (randOne == randTwo) randTwo++
    if (randTwo == 0) randTwo++

    let numOne = _constant?_constant:this.rand(0,_range)
    let numTwo = this.rand(0,_range)
    if (_operator == 'div' && numTwo == 0) numTwo++

    var obj = {numOne:numOne,numTwo:numTwo,randOne:randOne,randTwo:randTwo}
    return obj
  }

  calculateEquation(_numOne,_numTwo,_operator){
    let operator = _operator
    let numOne = _numOne
    let numTwo = _numTwo
    let answer = _numOne + _numTwo

    if (operator == 'sub'){
        answer = numOne
        numOne = numOne + numTwo
    } else if (operator == 'mul'){
        answer = numOne * numTwo
    } else if (operator == 'div'){
        answer = numOne
        numOne = numOne * numTwo
    }

    // console.log('ce',numOne,numTwo,answer);
    var obj = {numOne:numOne,numTwo:numTwo,answer:answer}
    return obj
  }

  render() {
    let numOne = this.state.equation.numOne
    let numTwo = this.state.equation.numTwo
    let answer = this.state.equation.answer
    let randOne = this.state.numbers.randOne
    let randTwo = this.state.numbers.randTwo

    return (
      <div className="page-main">

        <ReactHowler
          src='http://math.michaelgallay.com/audio/right.mp3'
          playing={this.state.rightFX}
          ref={(ref) => (this.rightFX = ref)}
        />

        <ReactHowler
          src='http://math.michaelgallay.com/audio/wrong.mp3'
          playing={this.state.wrongFX}
          ref={(ref) => (this.wrongFX = ref)}
        />

        <ReactHowler
          src='http://math.michaelgallay.com/audio/level1.mp3'
          playing={this.state.levelFX}
          ref={(ref) => (this.levelFX = ref)}
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
          fullHealth={fullHealth}
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
          randOne={randOne}
          randTwo={randTwo}
        />
        <Modal
          title={this.state.modalTitle}
          body={this.state.modalBody}
          score={this.state.score}
          gameplayBtns={true}
          bonus={this.state.bonus}
          visible={this.state.modalVisible}
          closeModal={()=>{this.closeModal()}}
        />
      </div>
    );
  }
}

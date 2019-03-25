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
import NumberPad from '../NumberPad/NumberPad';
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
    let range = 11
    let hidden = true
    let battle = false
    let countdown = 3
    let hitpoints = 200
    if (gamemode == 'health') {
      nextQuestionDelay = 1000
      countdown = 4
    }


    let numbers = this.calculateNumbers(constant,range,operator)
    let equation = this.calculateEquation(numbers.numOne,numbers.numTwo,operator)
    this.introCountdown = this.introCountdown.bind(this)

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
      levelFX:false,
      hidden,
      countdown,
      hitpoints
    };

  }

  componentWillMount(){

    let hidden = false;
    //hide the layout until the css is loaded
     let hider = setTimeout(() => {
        this.setState({hidden});
        (this.state.gamemode == 'countdown')?this.introCountdown():this.readyToBattle(1000);
      }, 1000)
  }

  introCountdown(){
    let countdown = this.state.countdown;
    // console.log('introCountdown',countdown);
    let readySetGo = setInterval(() => {
      // console.log('int',this.state.countdown);
        countdown--;
      if (countdown == 0) {
        // console.log('fight');
        countdown = 'FIGHT!'
        this.readyToBattle(1000)
        clearInterval(readySetGo)
      }
      this.setState({countdown})
    },1000)
  }

  readyToBattle(delay){
    //bring flashcard onto the field
    let readyToBattle = setTimeout(() => {
      let battle = true
      this.setState({battle});
    }, delay)
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
      if (this.state.gamemode == "countdown"){
        if (score >= this.state.hitpoints) console.log('battle won!');
      }
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
      let bonus, accuracy, modalTitle, modalBody;
      if (this.state.health <= 0 && this.state.gamemode == 'health'){
        console.log("Game Over");
        bonus = 0
        accuracy = Math.round(this.state.numRight / (this.state.numRight + fullHealth) * 100)
        if (this.state.numRight + this.state.numWrong == 0) accuracy = 0
        modalTitle = 'Keep practicing!'
        modalBody = 'Your score:<br><h3>' + this.state.score + '</h3><span class="green bold">You got ' + this.state.numRight+ ' correct!</span><br><br><span class="bold">' + accuracy + '% Accuracy</span><br><br>Improve your score and accuracy to unlock the next level.'

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
      }else if (this.state.score >= this.state.hitpoints && this.state.gamemode == 'countdown'){
        //you defeated the wizard
        console.log('you defeated the wizard');
        accuracy = Math.round(this.state.numRight / (this.state.numRight + this.state.numWrong) * 100)
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

        this.state.timerid = setTimeout(() => {
          this.setState({
            modalVisible:true,
            modalTitle,
            modalBody,
            bonus,
            rightFX:false,
            wrongFX:false,
            levelFX:false
          })
        }, 3000);

        this.setState({
          battle: false,
          gameover: true,
          countdown: 'VICTORY!'
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

    if (this.state.countdown != 'VICTORY!'){
      this.state.timerid = setTimeout(() => {
        this.setState({
          modalVisible:true,
          modalTitle,
          modalBody,
          bonus,
          rightFX:false,
          wrongFX:false,
          levelFX:false
        })
      }, 3000);

      this.setState({
        battle: false,
        gameover: true,
        countdown: 'DEFEAT!'
      })
    }


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
    let battle = false;
    let countdown = this.state.countdown;
    console.log('asd',countdown);
    if (countdown == "DEFEAT!" || countdown == "VICTORY!"){
      battle = true;
      countdown = "";
    }
    let delay = 300;

    if (this.state.gamemode == 'health') battle = true; delay = 0;

    this.setState({
      modalVisible:false,
      answered:false,
      correct:null,
      health:fullHealth,
      streak:0,
      bonus:0,
      multiplier:1,
      score:0,
      numRight:0,
      numWrong:0,
      gameover:false,
      restart:true,
      battle,
      countdown
    })

    this.state.timerid = setTimeout(() => {
      this.nextQuestion()
    }, delay);

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
    let opacity = (!this.state.hidden)?1:0
    let styles = {opacity};

    let numOne = this.state.equation.numOne
    let numTwo = this.state.equation.numTwo
    let answer = this.state.equation.answer
    let randOne = this.state.numbers.randOne
    let randTwo = this.state.numbers.randTwo

    let answerPad = <Answers
      answered={this.state.answered}
      onAnswer={(correct)=>{this.onAnswer(correct)}}
      answer={answer}
      randOne={randOne}
      randTwo={randTwo}
    />
    if (this.state.gamemode == 'countdown'){
      answerPad = <NumberPad
        answered={this.state.answered}
        onAnswer={(correct)=>{this.onAnswer(correct)}}
        answer={answer}
        gameover={this.state.gameover}
      />
    }

    //don't replay the battle animation countdown on rematch
    let gameArtBattleClass = 'ready';
    if (this.state.countdown == '') gameArtBattleClass = 'ready rematch';

    return (
      <div style={styles} className={`gameplaymath main ${this.state.gamemode}`}>
        <div className="main-fade" style={styles}>
          <div className="wrapper">
          <ScoreBoard
            onTimeExpired={()=>{this.timeExpired()}}
            ready={this.state.battle}
            multiplier={this.state.multiplier}
            streak={this.state.streak}
            correct={this.state.correct}
            score={this.state.score}
            gamemode={this.state.gamemode}
            gameover={this.state.gameover}
            restart={this.state.restart}
            fullHealth={fullHealth}
            health={this.state.health}
            hitpoints = {this.state.hitpoints}
            modalVisible = {this.state.modalVisible}
          />

          <div className="gameArt">
            <div className={`wizard wizard-battle ${(this.state.countdown<3 || this.state.countdown=="FIGHT!")?gameArtBattleClass:''}`}></div>
            <div className={`wizard wizard-defeat ${(this.state.countdown=="DEFEAT!")?'ready':''}`}></div>
            <div className={`wizard wizard-victory ${(this.state.countdown=="VICTORY!")?'ready':''}`}></div>
            <div className={`student ${(this.state.countdown<3 || this.state.countdown=="FIGHT!")?gameArtBattleClass:''}`}></div>
            <div className={`countdown ${(this.state.battle)?'ready':''}`}>{this.state.countdown}</div>
          </div>

          <div className="howler">
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
          </div>

          <div className={`flashcard ${(this.state.battle)?'battle':''}`}>

            <Equation
              operator={this.state.operator}
              numOne={numOne}
              numTwo={numTwo}
            />

            {answerPad}

          </div>

          <Modal
            title={this.state.modalTitle}
            body={this.state.modalBody}
            score={this.state.score}
            gameplayBtns={true}
            bonus={this.state.bonus}
            operator={this.state.operator}
            visible={this.state.modalVisible}
            closeModal={()=>{this.closeModal()}}
          />
        </div>  
        </div>
      </div>
    );
  }
}

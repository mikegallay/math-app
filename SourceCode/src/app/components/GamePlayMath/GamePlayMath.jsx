/**
 * GamePlayMath component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';
import ReactHowler from 'react-howler'
import {firebaseAuth,ref,hideTimer,staffBase,trainingTotal,trainingChances} from "../../config/constants";

import './GamePlayMath.scss';
import Equation from '../Equation/Equation';
import ScoreBoard from '../ScoreBoard/ScoreBoard';
import Answers from '../Answers/Answers';
import NumberPad from '../NumberPad/NumberPad';
import Modal from '../Modal/Modal';
import SnackBar from '../SnackBar/SnackBar';
import Tutorial from '../Tutorial/Tutorial';

const localUser = "localUser";

const unlockScore = 500;//2500
const unlockDecimal = 100;
const releaseScore = 100;//2500
const requiredAccuracy = 60;//80
let fullHealth = trainingChances;
let baseDamage = staffBase;
let trainingQuestions = [];

export default class GamePlayMath extends React.Component {
  constructor(props) {
    super(props);

    const {operator, gamemode, constant, randomize, level, tutorial} = props.location.state

    console.log('gameplay',props);

    let nextQuestionDelay = 50
    let range = 12
    let hidden = true
    let battle = false
    let countdown = 3
    let streakTarget = 3
    let hitpoints = 2500
    if (gamemode == 'training') {
      nextQuestionDelay = 1000
      // countdown = 4
    }
    let mulligans = 0
    let lifeboost = false
    let charm = false

    if (level==2) {
      streakTarget = 5
      hitpoints = 4000
      range = 24
    }

    // console.log('gp level',level);
    this.createTrainingQuestions(constant,range,operator,randomize);

    let numbers = this.calculateNumbers(constant,range,operator)
    if (gamemode == 'training'){
      numbers = trainingQuestions[0];
    }

    let equation = this.calculateEquation(numbers.numOne,numbers.numTwo,operator)

    this.introCountdown = this.introCountdown.bind(this)

    //check if we are looking at random (final battle) for the first time and set revealed to true
    let locUser = JSON.parse(localStorage.getItem(localUser));
    if (locUser.gamemath.ran.unlocked && !locUser.gamemath.ran.revealed){
      locUser.gamemath.ran.revealed = true;
      //save to localstorage
      localStorage.setItem(localUser, JSON.stringify(locUser));

      //sync to firebase
      let userRef = ref.ref('/users/' + locUser.userid + '/gamemath/ran/revealed');
      userRef.set(locUser.gamemath.ran.revealed);
    }

    /* STAFF BONUS LOGIC */

    let staff = locUser.staffs.current;
    // if (staff == "forest") baseDamage *= 2;
    // if (staff == "forest") mulligans = 1;
    /*if (staff == "forest") {
      fullHealth += 1
      lifeboost = true
    }*/
    if (staff == "forest") charm = true

    this.state = {
      sbActive:false,
      sbMessage:'snack',
      score:0,
      streak: 0,
      correct:null,
      bonus:0,
      accuracy:0,
      answered: false,
      timeExpired: false,
      multiplier: 1,
      gameover: false,
      restart:false,
      health: fullHealth,
      numTotal:0,
      numRight:0,
      numWrong:0,
      streakTarget,
      operator,
      gamemode,
      constant,
      level,
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
      hitpoints,
      tutorial,
      staff,
      mulligans,
      lifeboost,
      charm,
      progressTotal:(gamemode == 'training') ? trainingTotal : hitpoints,
      progressLeft:(gamemode == 'training') ? trainingQuestions.length : hitpoints
    };

    console.log('gpstate',this.state);

    //update tutorial code if necessary
    if (this.state.tutorial != ''){
      let tut = (this.state.gamemode == 'battle') ? 'battle' : 'training';

      //save to localstorage
      locUser.tutorials[tut] = true;
      localStorage.setItem(localUser, JSON.stringify(locUser));

      //sync to firebase
      let userRef = ref.ref('/users/' + locUser.userid + '/tutorials/' + tut);
      userRef.set(locUser.tutorials[tut]);
    }


  }

  createTrainingQuestions(_constant,_range,_operator,_randomize){
    trainingQuestions = [];
    let operator = (_randomize) ? 'ran' : _operator
    for (var i = 0; i<=trainingTotal-1; i++){
      let numbers = this.calculateNumbers(_constant,_range,operator)
      trainingQuestions.push(numbers)
    }

    console.log('trainingQuestions',trainingQuestions);

  }

  componentWillMount(){
    let hidden = false;
    //hide the layout until the css is loaded
     let hider = setTimeout(() => {
        this.setState({hidden});
        (this.state.gamemode == 'battle')?this.introCountdown():this.readyToBattle(1000);
      }, hideTimer)
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

  showSnackbarMessage(message){
    // console.log('sb',message);
    let tutorial = '';
    if (message == "You found the last creature!! Are you ready for the final battle?"){
      tutorial = 'final'
    }
    this.setState({sbActive:true,sbMessage:message,tutorial});

    //save tutorial final
    if (tutorial == 'final'){
      //save to localstorage
      let locUser = JSON.parse(localStorage.getItem(localUser));
      locUser.tutorials.final = true;
      localStorage.setItem(localUser, JSON.stringify(locUser));

      //sync to firebase
      let userRef = ref.ref('/users/' + locUser.userid + '/tutorials/final');
      userRef.set(locUser.tutorials.final);
    }

    let sbTimer = setTimeout(() => {
      this.setState({sbActive:false});
    }, 5000)

  }

  onAnswer(isCorrect){
    // prevent multiple button presses for same answer
    if (this.state.answered) return;

    this.stopAudio()

    let answered = true;
    let numTotal = this.state.numTotal + 1;
    let correct = isCorrect;
    let multiplier = this.state.multiplier;

    if (isCorrect){
      let numRight = this.state.numRight + 1
      let streak = this.state.streak + 1
      multiplier = Math.floor(streak/this.state.streakTarget)+1
      let levelFX = false
      if (streak%this.state.streakTarget==0) levelFX=true
      let score = this.state.score + (baseDamage * multiplier)


      if (this.state.gamemode == 'battle'){
        if (score >= this.state.hitpoints) console.log('battle won!');
      } else {
        trainingQuestions.shift();
      }

      this.setState({
        numRight,numTotal,score,streak,answered,multiplier,correct,modalVisible:false,
        rightFX:true,wrongFX:false,levelFX,
        progressTotal:(this.state.gamemode == 'training') ? trainingTotal : this.state.hitpoints,
        progressLeft:(this.state.gamemode == 'training') ? trainingQuestions.length : this.state.hitpoints - score
      })

    }else{ //is wrong
      // console.log('m',this.state.mulligans);
        let numWrong = this.state.numWrong + 1
        let mulligans = this.state.mulligans
        let streak = 0
        multiplier = 1
        let health = this.state.health - 1
        if (this.state.mulligans > 0){
          numWrong -= 1
          streak = this.state.streak
          multiplier = this.state.multiplier
          health = this.state.health
          mulligans -= 1
        }

        if (this.state.gamemode == 'training'){
          trainingQuestions.push(trainingQuestions.splice(0, 1)[0]);
        }

        this.setState({
          numWrong,numTotal,streak,mulligans,answered,multiplier,health,correct,
          rightFX:false,wrongFX:true,levelFX:false
        })
    }

    if (this.state.timerid) {
      clearTimeout(this.state.timerid);
    }

    this.state.timerid = setTimeout(() => {
      let score = this.state.score, bonus=0,accuracy, modalTitle, modalBody;
      let locUser = JSON.parse(localStorage.getItem(localUser))
      var operator = (this.state.randomize) ? 'ran' : this.state.operator
      // let minTrainingBonus = 500;

      if ((this.state.health <= 0 || trainingQuestions.length == 0) && this.state.gamemode == 'training'){
        console.log("Game Over");
        accuracy = Math.round(this.state.numRight / this.state.numTotal * 100)
        if (this.state.numRight + this.state.numWrong == 0) accuracy = 0

        //while in training, you didn't unlock a creature
        if (this.state.health === 0){
          bonus=0;
          modalTitle = 'Keep practicing!';
          modalBody = 'Your score:<br><h3>' + this.state.score + '</h3><span class="green bold">You got ' + this.state.numRight+ ' correct!</span><br><br><span class="bold">' + accuracy + '% Accuracy</span><br><br>Get all the training questions correct to unlock bonuses.'
        }

        //did they do well enough to unlock level1
        if (this.state.health > 0 && score >= unlockScore){

          //check to see if level1 is unlocked yet and update message
          if (!locUser.gamemath[operator].unlocked1){
            bonus = 0;
            modalTitle = "You've unlocked Level 1!"
            modalBody = 'Your score:<br><h3>' + score + '</h3><span class="green bold">You got ' + this.state.numRight+ ' correct!</span><br><br><span class="bold">' + accuracy + '% Accuracy</span><br><br>You’ve proven that you are ready for the next level.'

            //set unlocked1 one time
            locUser.gamemath[operator].unlocked1 = true;

            let kingdom = "Addition";
            if (operator=='sub') kingdom = "Subtraction";
            if (operator=='mul') kingdom = "Multiplication";
            if (operator=='div') kingdom = "Division";
            let unlockedMessage = "Level 1 in " + kingdom + " has been unlocked!";
            this.showSnackbarMessage(unlockedMessage);

          } else {
            //already unlocked level1 - check to see if all creatures are unlocked
            let creatures = locUser.creatures[operator];
            if (creatures.L1_1_1 && creatures.L1_1_2 && creatures.L1_1_3){
              bonus = 1;
              modalTitle = 'Well done!'
              modalBody = 'Your score:<br><h3>' + this.state.score + '</h3><span class="green bold">You got ' + this.state.numRight+ ' correct!</span><br><br><span class="bold">' + accuracy + '% Accuracy</span><br><br>'
            }else{
              bonus = 2;
              modalTitle = 'You found a creature!'
              modalBody = 'Your score:<br><h3>' + this.state.score + '</h3><span class="green bold">You got ' + this.state.numRight+ ' correct!</span><br><br><span class="bold">' + accuracy + '% Accuracy</span><br><br>Click the box to see who you have rescued.'
            }
          }

          // if (this.state.score > this.state.unlockScore){
            // bonus = Math.floor(this.state.score/unlockDecimal)
            // bonus = this.state.score;
          // }

          // var operator = (this.state.randomize) ? 'ran' : this.state.operator


          //set new high score
          if (this.state.score > locUser.gamemath[operator].training){
            locUser.gamemath[operator].training = this.state.score
          }

          //save to localstorage
          localStorage.setItem(localUser, JSON.stringify(locUser));

          //sync to firebase
          let userRef = ref.ref('/users/' + locUser.userid + '/gamemath/' + operator);
          userRef.set(locUser.gamemath[operator]);
        }

        // console.log('here',trainingQuestions);
        this.setState({
          gameover: true,
          modalVisible:true,
          modalTitle,
          modalBody,
          rightFX:false,
          wrongFX:false,
          bonus,
          accuracy,
          levelFX:false,
          progressTotal:(this.state.gamemode == 'training') ? trainingTotal : this.state.hitpoints,
          progressLeft:(this.state.gamemode == 'training') ? trainingQuestions.length : this.state.hitpoints - this.state.score
        })
      } else if (this.state.score >= this.state.hitpoints && this.state.gamemode == 'battle'){
        //you defeated the wizard

        console.log('you defeated the wizard');
        accuracy = Math.round(this.state.numRight / (this.state.numRight + this.state.numWrong) * 100)
        //did they release a monster
        bonus = 1;
        modalTitle = 'Well done!'
        modalBody = 'Your score:<br><h3>' + this.state.score + '</h3><span class="green bold">You got ' + this.state.numRight+ ' correct!</span><br><br><span class="bold">' + accuracy + '% Accuracy</span><br><br>'
        if (accuracy >= requiredAccuracy){
          bonus = 2;
          modalTitle = 'You unlocked a secret!'
          modalBody = 'Your score:<br><h3>' + this.state.score + '</h3><span class="green bold">You got ' + this.state.numRight+ ' correct!</span><br><br><span class="bold">' + accuracy + '% Accuracy</span><br><br>Click the box to open it.'

          // multiply by 10000 to designate it as a creature in the Bonus component
          // bonus = Math.floor(this.state.score/unlockDecimal) * 10000
          // bonus = this.state.score;

          //sync data
          // var operator = (this.state.randomize) ? 'ran' : this.state.operator

          // locUser.gamemath[operator].unlocked = true;

          //set new high score
          if (this.state.level == 1){
            if (this.state.score > locUser.gamemath[operator].battle1) locUser.gamemath[operator].battle1 = this.state.score
          } else if (this.state.level == 2){
            if (this.state.score > locUser.gamemath[operator].battle2) locUser.gamemath[operator].battle2 = this.state.score
          }

          // console.log('loc user', locUser);

          //save to localstorage
          localStorage.setItem(localUser, JSON.stringify(locUser));

          //sync to firebase
          let userRef = ref.ref('/users/' + locUser.userid + '/gamemath/' + operator);
          userRef.set(locUser.gamemath[operator]);
        }

        this.state.timerid = setTimeout(() => {
          this.setState({
            modalVisible:true,
            modalTitle,
            modalBody,
            bonus,
            accuracy,
            rightFX:false,
            wrongFX:false,
            levelFX:false
          })
        }, 3000);

        this.setState({
          battle: false,
          gameover: true,
          countdown: 'VICTORY!',
          score:0
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
    let score = this.state.score
    if (this.state.numRight + this.state.numWrong == 0) accuracy = 0
    let modalTitle = 'You were defeated!'
    let modalBody = 'Your score:<br><h3>' + this.state.score + '</h3><span class="green bold">' + this.state.numRight+ ' Correct</span> – <span class="red bold">' + this.state.numWrong + ' Wrong</span><br><br><span class="bold">' + accuracy + '% Accuracy</span><br><br>Why don’t you try again?'

    //did they release a monster
    // console.log('release',this.state.score,this.state.hitpoints);
    /*if (accuracy >= requiredAccuracy && this.state.score >= this.state.hitpoints){

      modalTitle = 'You unlocked a secret!'
      modalBody = 'Your score:<br><h3>' + this.state.score + '</h3><span class="green bold">You got ' + this.state.numRight+ ' correct!</span><br><br><span class="bold">' + accuracy + '% Accuracy</span><br><br>Click the box to open it.'

      // multiply by 10000 to designate it as a creature in the Bonus component
      // bonus = Math.floor(this.state.score/unlockDecimal) * 10000
      // bonus = this.state.score;
    } */
      //sync data
      var locUser = JSON.parse(localStorage.getItem(localUser))
      // console.log('loc id', locUser.userid);
      var operator = (this.state.randomize) ? 'ran' : this.state.operator
      // locUser.gamemath[operator].unlocked1 = true;

      //set new high score
      if (this.state.level == 1){
        if (this.state.score > locUser.gamemath[operator].battle1) locUser.gamemath[operator].battle1 = this.state.score
      } else if (this.state.level == 2){
        if (this.state.score > locUser.gamemath[operator].battle2) locUser.gamemath[operator].battle2 = this.state.score
      }

      //save to localstorage
      localStorage.setItem(localUser, JSON.stringify(locUser));

      //sync to firebase
      let userRef = ref.ref('/users/' + locUser.userid + '/gamemath/' + operator);
      userRef.set(locUser.gamemath[operator]);


    let modalVisible = (modalBody == 'Game not started')?false:true;

    if (this.state.countdown != 'VICTORY!' && !this.state.timeExpired){
      this.state.timerid = setTimeout(() => {
        this.setState({
          modalVisible,
          modalTitle,
          modalBody,
          // bonus,
          accuracy,
          rightFX:false,
          wrongFX:false,
          levelFX:false
        })
      }, 2000);

      this.setState({
        battle: false,
        gameover: true,
        countdown: 'DEFEAT!',
        timeExpired: true
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
    if (this.state.gamemode == 'training'){
      console.log('next q training');
      numbers = trainingQuestions[0];
    }
    let equation = this.calculateEquation(numbers.numOne,numbers.numTwo,this.state.operator)

    this.setState({
      answered,
      correct,
      numbers,
      equation,
      restart:false
    })

    if (this.state.gamemode == 'training') this.stopAudio()

  }

  closeModal(){
    // console.log('game play closeModal');
    // this.clearAnswers()
    let battle = false;
    let countdown = this.state.countdown;

    if (countdown == "DEFEAT!" || countdown == "VICTORY!"){
      battle = true;
      countdown = "";
    }
    let delay = 300;

    //checkthis
    if (this.state.gamemode == 'training') battle = true; delay = 0;

    this.createTrainingQuestions(this.state.constant,this.state.range,this.state.operator,this.state.randomize);

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
      numTotal:0,
      numWrong:0,
      gameover:false,
      restart:true,
      timeExpired:false,
      battle,
      countdown,
      progressTotal:(this.state.gamemode == 'training') ? trainingTotal : this.state.hitpoints,
      progressLeft:(this.state.gamemode == 'training') ? trainingQuestions.length : this.state.hitpoints
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

  hideTutorial(){
    console.log('hide tutorial');
    this.setState({tutorial:true})
  }

  render() {
    let opacity = (!this.state.hidden)?1:0
    let styles = {opacity};

    let numOne = this.state.equation.numOne
    let numTwo = this.state.equation.numTwo
    let answer = this.state.equation.answer
    let randOne = this.state.numbers.randOne
    let randTwo = this.state.numbers.randTwo

    let tutorial = <div></div>
    if (this.state.tutorial == 'training') tutorial = <Tutorial gamemode='training' hideTutorial={()=>{this.hideTutorial()}}/>
    if (this.state.tutorial == 'battle') tutorial = <Tutorial gamemode='battle' hideTutorial={()=>{this.hideTutorial()}}/>
    if (this.state.tutorial == 'final') tutorial = <Tutorial gamemode='final' hideTutorial={()=>{this.hideTutorial()}}/>

    let answerPad = <Answers
      answered={this.state.answered}
      onAnswer={(correct)=>{this.onAnswer(correct)}}
      answer={answer}
      randOne={randOne}
      randTwo={randTwo}
    />
    if (this.state.gamemode == 'battle'){
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
      <div style={styles} className={`gameplaymath main ${this.state.gamemode} land-${this.state.operator}`}>
        <div className="main-fade" style={styles}>
          <div className="wrapper">
            <ScoreBoard
              onTimeExpired={()=>{this.timeExpired()}}
              ready={this.state.battle}
              multiplier={this.state.multiplier}
              streak={this.state.streak}
              streakTarget={this.state.streakTarget}
              correct={this.state.correct}
              lifeboost = {this.state.lifeboost}
              score={this.state.score}
              level={this.state.level}
              gamemode={this.state.gamemode}
              gameover={this.state.gameover}
              restart={this.state.restart}
              fullHealth={fullHealth}
              health={this.state.health}
              hitpoints = {this.state.hitpoints}
              modalVisible = {this.state.modalVisible}
              progressTotal = {this.state.progressTotal}
              progressLeft = {this.state.progressLeft}
            />

            <div className="gameArt">
              <div className={`wizard wizard-battle ${'level'+this.state.level} ${(this.state.countdown<3 || this.state.countdown=="FIGHT!")?gameArtBattleClass:''}`}></div>
              <div className={`wizard wizard-defeat ${'level'+this.state.level} ${(this.state.countdown=="DEFEAT!")?'ready':''}`}></div>
              <div className={`wizard wizard-victory ${'level'+this.state.level} ${(this.state.countdown=="VICTORY!")?'ready':''}`}></div>
              <div className={`student ${'level'+this.state.level} ${(this.state.countdown<3 || this.state.countdown=="FIGHT!")?gameArtBattleClass:''}`}></div>
              <div className={`countdown luckiest-guy ${(this.state.battle)?'ready':''}`}>{this.state.countdown}</div>
            </div>

            <div className="howler">
              <ReactHowler
                src='/audio/right.mp3'
                playing={this.state.rightFX}
                ref={(ref) => (this.rightFX = ref)}
              />
              <ReactHowler
                src='/audio/wrong.mp3'
                playing={this.state.wrongFX}
                ref={(ref) => (this.wrongFX = ref)}
              />
              <ReactHowler
                src='/audio/level1.mp3'
                playing={this.state.levelFX}
                ref={(ref) => (this.levelFX = ref)}
              />
            </div>

            <div className={`flashcard ${(this.state.battle)?'battle':''}`}>
              <div className="flashcard-back"></div>
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
              level={this.state.level}
              bonus={this.state.bonus}
              charm={this.state.charm}
              accuracy={this.state.accuracy}
              operator={this.state.operator}
              visible={this.state.modalVisible}
              snackbar={(m)=>{this.showSnackbarMessage(m)}}
              closeModal={()=>{this.closeModal()}}
            />
          </div>
          {tutorial}
          <SnackBar active={this.state.sbActive} message={this.state.sbMessage}/>
        </div>
      </div>
    );
  }
}

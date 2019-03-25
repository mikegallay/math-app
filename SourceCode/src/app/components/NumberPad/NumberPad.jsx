/**
 * Answers component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';

import './NumberPad.scss';
import Answer from '../Answer/Answer';

export default class NumberPad extends React.Component {
  constructor(props) {
    super(props);
    console.log('answers',props);
    let staticAnswers = [1,2,3,4,5,6,7,8,9,0];
    let answerString = this.props.answer.toString()
    let currAnswer = ''
    let lastAnswer = ''
    let correct = 'default'
    this.state = {staticAnswers,currAnswer,answerString,correct,lastAnswer};
    this.padPress = this.padPress.bind(this);
    this.removeIsCorrect = this.removeIsCorrect.bind(this);
    this.clearAnswerBox = this.clearAnswerBox.bind(this);
  }

  componentWillReceiveProps(props){
    console.log('numpad did update',props);
    let answerString = props.answer.toString()
    if (props.answer) {
      this.setState({answerString})
    }
    if (props.gameover == true){
      this.setState({currAnswer:''})
    }
  }

  padPress(val){
    // console.log('padpress',val);
    let entry = val.toString();
    let currAnswer = this.state.currAnswer + entry;
    let lastAnswer = currAnswer
    let correct = (currAnswer == this.state.answerString)
    // console.log(currAnswer,currAnswer.length,this.props.answer,this.state.answerString, this.state.answerString.length);
    if (currAnswer.length == this.state.answerString.length){
      // console.log('YES');
        this.props.onAnswer(correct)
        currAnswer = '';
        this.setState({currAnswer,correct,lastAnswer})
        this.removeIsCorrect();
    }else{
      this.setState({currAnswer,correct:'default'})
    }
  }

  removeIsCorrect(){
    let remover = setTimeout(() => {
      let correct = 'default'
      this.setState({correct});
    }, 750)
  }

  clearAnswerBox(){
    console.log('clearn');
    let correct = 'default';
    let currAnswer = '';
      this.setState({currAnswer,correct})
  }

  render() {
    let isCorrect = '';
    let yourAnswer = this.state.currAnswer;

    if (this.state.correct == false) isCorrect = 'incorrect';
    if (this.state.correct == true) isCorrect = 'correct';
    if (isCorrect != '') yourAnswer = this.state.lastAnswer;
    return(
      <div className="numberpad-wrapper">
        <div className="numbers">
        {this.state.staticAnswers.map((arr,idx) => {
          return (
            <Answer
              key={idx}
              answered={this.props.answered}
              onAnswer={(val)=>{this.padPress(val)}}
              value={arr}
              status={''}
              gamemode='countdown'
            />
          );
        })}
        </div>
        <div
          onClick={() => this.clearAnswerBox()}
          className={`answerbox ${isCorrect} ${(yourAnswer.length > 0 && this.state.answerString.length > 1 && yourAnswer.length != this.state.answerString.length)?
          'inprogress':''}`}><span className="yourAnswer">{yourAnswer}</span></div>
        </div>
    );
  }
}

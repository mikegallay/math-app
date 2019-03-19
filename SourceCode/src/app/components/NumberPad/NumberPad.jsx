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
    let staticAnswers = [0,1,2,3,4,5,6,7,8,9];
    let answerString = this.props.answer.toString()
    let currAnswer = ''
    this.state = {staticAnswers,currAnswer,answerString};
    this.padPress = this.padPress.bind(this);
  }

  componentWillReceiveProps(props){
    // console.log('did update',props);
    let answerString = props.answer.toString()
    if (props.answer) {
      this.setState({answerString})
    }
  }

  padPress(val){
    // console.log('padpress',val);
    let entry = val.toString();
    let currAnswer = this.state.currAnswer + entry;
    let correct = (currAnswer == this.state.answerString)
    // console.log(currAnswer,currAnswer.length,this.props.answer,this.state.answerString, this.state.answerString.length);
    if (currAnswer.length == this.state.answerString.length){
      // console.log('YES');
        this.props.onAnswer(correct)
        currAnswer = '';
    }
    this.setState({currAnswer})
  }

  render() {

    return(
      <div className="numberpad-wrapper">
      {this.state.staticAnswers.map((arr,idx) => {
          return (
            <Answer
              key={idx}
              answered={this.props.answered}
              onAnswer={(val)=>{this.padPress(val)}}
              value={arr}
              status={''}
            />
          );
        })}
        </div>
    );
  }
}

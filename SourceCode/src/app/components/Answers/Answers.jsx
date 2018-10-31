/**
 * Answers component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';

import './Answers.scss';
import Answer from '../Answer/Answer';

export default class Answers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      staticAnswers:[
        {top:this.props.numOne,bot:this.props.numTwo,rand:0,status:'correct'},
        {top:this.props.numOne,bot:this.props.numTwo,rand:this.props.randOne,status:''},
        {top:this.props.numOne,bot:this.props.numTwo,rand:this.props.randTwo,status:''}
      ],

    };
  }

  componentWillReceiveProps(nextProps){
    console.log('np',nextProps,nextProps.answered);
    if (nextProps.answered == false){
      let staticAnswers = [
        {top:nextProps.numOne,bot:nextProps.numTwo,rand:0,status:'correct'},
        {top:nextProps.numOne,bot:nextProps.numTwo,rand:nextProps.randOne,status:''},
        {top:nextProps.numOne,bot:nextProps.numTwo,rand:nextProps.randTwo,status:''}
      ]

      let shuffledAnswers = this.shuffleArray(staticAnswers);

      this.setState({
        staticAnswers:shuffledAnswers
      })
    }
  }

  shuffleArray(array) {
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  rand(min,max){
    return Math.floor(Math.random() * ((max-min)+1) + min)
  }

  render() {

    return(
      <div className="answers-wrapper">
      {this.state.staticAnswers.map((answer,idx) => {
          return (
            <Answer
              key={idx}
              answered={this.props.answered}
              onAnswer={this.props.onAnswer}
              value={answer.top+answer.bot+answer.rand}
              status={answer.status}
            />
          );
        })}
        </div>
    );
  }
}

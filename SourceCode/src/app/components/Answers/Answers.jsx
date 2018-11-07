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
    console.log('answers',props);
    this.state = {
      staticAnswers:[
        {answer:this.props.answer,rand:0,status:'correct'},
        {answer:this.props.answer,rand:this.props.randOne,status:''},
        {answer:this.props.answer,rand:this.props.randTwo,status:''}
      ],

    };
  }

  componentWillReceiveProps(nextProps){
    // console.log('np',nextProps,nextProps.answered);
    if (nextProps.answered == false){
      let staticAnswers = [
        {answer:nextProps.answer,rand:0,status:'correct'},
        {answer:nextProps.answer,rand:nextProps.randOne,status:''},
        {answer:nextProps.answer,rand:nextProps.randTwo,status:''}
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

  render() {

    return(
      <div className="answers-wrapper">
      {this.state.staticAnswers.map((arr,idx) => {
          return (
            <Answer
              key={idx}
              answered={this.props.answered}
              onAnswer={this.props.onAnswer}
              value={arr.answer+arr.rand}
              status={arr.status}
            />
          );
        })}
        </div>
    );
  }
}

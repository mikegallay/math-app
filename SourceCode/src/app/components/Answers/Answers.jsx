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

    this.state = {};
  }

  render() {
    return (
      <div className="answers-wrapper"> 
          <Answer answered={this.props.answered} onAnswer={this.props.onAnswer} value={4}/>
          <Answer answered={this.props.answered} onAnswer={this.props.onAnswer} value={5} status='correct'/>
          <Answer answered={this.props.answered} onAnswer={this.props.onAnswer} value={7}/>
      </div>
    );
  }
}

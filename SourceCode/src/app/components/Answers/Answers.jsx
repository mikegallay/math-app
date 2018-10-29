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
          <Answer data={{value:4,status:'incorrect'}}/>
          <Answer data={{value:5,status:'correct'}}/>
          <Answer data={{value:6,status:'incorrect'}}/>
      </div>
    );
  }
}

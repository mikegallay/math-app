/**
 * Answer component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';

import './Answer.scss';

export default class Answer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className={`answer unanswered ${this.props.data.status}`}>{this.props.data.value}</div>
    );
  }
}

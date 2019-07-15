/**
 * Answer component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';
import PropTypes from 'prop-types';

import './Answer.scss';

export default class Answer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let answerReturn = this.props.status=='correct';
    let isNumPad = (this.props.gamemode == 'battle')?true:false;
    if (isNumPad) answerReturn = this.props.value;

    return (
      <button
          onClick={(e)=> {if (!isNumPad) e.target.setAttribute('id','selected'); this.props.onAnswer(answerReturn); }}
          className={`answer ${this.props.answered ? '' : 'unanswered'} ${this.props.status}`}>
            {this.props.value}
      </button>
    );
  }
}

Answer.defaultProps = {
  status:"incorrect"
}

Answer.propTypes = {
  status: PropTypes.string
}

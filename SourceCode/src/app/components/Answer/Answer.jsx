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
    return (
      <button
          onClick={(e)=> {e.target.setAttribute('id','selected'); this.props.onAnswer(this.props.status=='correct'); }}
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

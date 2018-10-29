/**
 * Equation component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';
import { Link } from 'react-router-dom';

import './Equation.scss';

export default class Equation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="eq-wrapper">
        <div className="eq-top eq-operand">2</div>
        <div className="eq-bot eq-operand">3</div>
        <div className="eq-operator">+</div>
        <div className="eq-equals"></div>
      </div>
    );
  }
}

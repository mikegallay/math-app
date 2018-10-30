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

    const symbol = {'add' : '+', 'subtract':'-', 'multiply':'x', 'divide':'%'};
    
    this.state = {
      operator : symbol[this.props.data.version]
    };
  }

  render() {
    return (
      <div className="eq-wrapper">
        <div className="eq-top eq-operand">2</div>
        <div className="eq-bot eq-operand">3</div>
        <div className="eq-operator">{this.state.operator}</div>
        <div className="eq-equals"></div>
      </div>
    );
  }
}

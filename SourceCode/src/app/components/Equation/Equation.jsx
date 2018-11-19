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

    const symbol = {'add' : '+', 'sub':'–', 'mul':'x', 'div':'÷'};

    this.state = {
      symbol,
      operator : this.props.operator ? symbol[this.props.operator] : 'o'
    };
  }

  componentDidUpdate(props){
    // console.log('eq',props.operator, this.state.operator);
    if (props.operator && this.state.symbol[props.operator] != this.state.operator){
      this.setState({
        operator:this.state.symbol[props.operator]
      })
    }
  }

  render() {
    return (
      <div className="eq-wrapper">
        <div className="eq-top eq-operand">{this.props.numOne}</div>
        <div className="eq-bot eq-operand">{this.props.numTwo}</div>
        <div className="eq-operator">{this.state.operator}</div>
        <div className="eq-equals"></div>
      </div>
    );
  }
}

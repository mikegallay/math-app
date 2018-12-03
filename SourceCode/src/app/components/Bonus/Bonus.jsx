/**
 * Bonus component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';
import { Link } from 'react-router-dom';

import './Bonus.scss';
import coin from '../../images/coin.png';
import glow from '../../images/glow-wedge.png';

export default class Bonus extends React.Component {
  constructor(props) {
    super(props);

    let visible = props.openBonus ? props.openBonus : 'init false'
    this.state = {
      visible
    };
  }

  componentWillReceiveProps(props){
    console.log('did update',props);
    if (props.openBonus != this.state.visible) {
      console.log('here');
      this.setState({visible:props.openBonus})
    }
  }

  closeBonus(){
    this.setState({visible:false})
  }

  openBonus(){
    this.setState({visible:true})
  }

  render() {
    let bonus = <img className="bonus-item" src={coin} width="125" height="125"/>
    let headerImg = <div onClick={() => this.closeBonus()} className={`header-img-wrapper ${this.state.visible}`}>{bonus}</div>

    return (
      <div className={`bonus-wrapper ${this.state.visible}`}>
        <div className="bonus-overlay">
          <div className="bonus-glow">
            <img src={glow} width="500" height="500"/>
          </div>
          <div className="bonus-content">
            {headerImg}
            <div className="bonus-title">
              <h2>You got a coin</h2>
            </div>
          </div>

          {/* <button
            onClick={() => this.closeBonus()}
            className="close-btn">x</button> */}
        </div>
      </div>
    );
  }
}

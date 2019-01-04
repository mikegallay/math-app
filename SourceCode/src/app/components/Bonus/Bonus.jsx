/**
 * Bonus component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';
import ReactHowler from 'react-howler'

import './Bonus.scss';
import coin from '../../images/coin.png';
import glow from '../../images/glow-wedge.png';
import poop from '../../images/icon_sunglasses.png';

export default class Bonus extends React.Component {
  constructor(props) {
    super(props);

    let visible = props.openBonus ? props.openBonus : 'init false'

    this.state = {
      visible
    };
  }

  componentWillReceiveProps(props){
    // console.log('did update',props);
    if (props.openBonus != this.state.visible) {
      // console.log('here');
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
    let coinText = 'coins'
    let bonusPoints = this.props.bonusPoints
    if (bonusPoints == 1) coinText = 'coin'
    let bonusTitle = <h2>You got {bonusPoints} {coinText}!</h2>
    console.log('BONUS',bonusPoints);
    if (bonusPoints >= 10000){
      bonus = <img className="bonus-item" src={poop} width="125" height="125"/>
      bonusTitle = <h2>FREE!</h2>
    }

    let headerImg = <div onClick={() => this.closeBonus()} className={`header-img-wrapper ${this.state.visible}`}>{bonus}</div>

    let magicFX = (this.state.visible == true) ? true : false;
    return (
      <div className={`bonus-wrapper ${this.state.visible}`}>

        <ReactHowler
          src='http://math.michaelgallay.com/audio/magic.mp3'
          playing={magicFX}
          ref={(ref) => (this.magicFX = ref)}
        />

        <div className="bonus-overlay">
          <div className="bonus-glow">
            <img src={glow} width="500" height="500"/>
          </div>
          <div className="bonus-content">
            {headerImg}
            <div className="bonus-title">
              {bonusTitle}
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

/**
 * Bonus component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';
import ReactHowler from 'react-howler'
import {creatureList,firebaseAuth,ref} from "../../config/constants";

import './Bonus.scss';
import coin from '../../images/coin.png';
import glow from '../../images/glow-wedge.png';
import poop from '../../images/icon_sunglasses.png';
const creatures = require.context('../../images/creatures', true);

const localUser = "localUser";

const creatureBonus = 10000;
const rareBonus = 100000;

export default class Bonus extends React.Component {
  constructor(props) {
    super(props);

    let visible = props.openBonus ? props.openBonus : 'init false'

    this.state = {
      visible,
      creatureSet:false,
      bonusImg:'default',
      creature:'default',
      bonusTitle:'default'
    };
  }

  componentWillReceiveProps(props){
    // console.log('did update',props);
    if (props.openBonus != this.state.visible) {
      // console.log('here');
      this.setState({visible:props.openBonus})
    }
  }

  determineCreature(){
    console.log('determine creature');
    var locUser = JSON.parse(localStorage.getItem(localUser));
    let operator = this.props.operator
    let bonusImg = 'coin'
    let coinText = 'coins'
    let creature = 'default';
    let bonusPoints = this.props.bonusPoints
    if (bonusPoints == 1) coinText = 'coin'
    let bonusTitle = 'You got' + ' ' + bonusPoints + ' ' + coinText + '!'

    // console.log('BONUS',bonusPoints,locUser);

    //over 10000 (creatureBonus) signifies that a creature has been unlocked
    //this gets set in GamePlay
    if (bonusPoints >= creatureBonus && this.state.visible){
      //randomize logic for rewards

      let rareCreature = (bonusPoints > rareBonus && Math.random()*100 > 80) ? true : false;

      let rand = this.rand(1,3);
      creature = 'c' + rand;
      let creatureRef = creatureList.math[operator][creature];
      //localUser.creatures[operator]['c' + num];

      let title = creatureRef.name + '!'
      // Dynamically reference image
      // Set as inline style
      // Pass as prop to child
      let imgsrc = creatures(`./${creatureRef.img}.png`);

      bonusImg = imgsrc
      bonusTitle = title

      locUser.creatures[operator][creature] = true
      localStorage.setItem(localUser, JSON.stringify(locUser));

      let userRef = ref.ref('/users/' + locUser.userid + '/creatures/' + operator + "/" + creature );
      userRef.set(locUser.creatures[operator][creature]);

    }
    this.setState({
      bonusImg,bonusTitle,creature,creatureSet:true
    })
  }

  closeBonus(){
    this.setState({visible:false})
  }

  openBonus(){
    this.setState({visible:true})
  }

  rand(min,max){
    var num = Math.floor(Math.random() * ((max-min)+1) + min)
    if (num < 10) num = "0" + num;
    return num;
  }

  render() {

    let bonus = <img className="bonus-item" src={this.state.bonusImg} width="250" height="250"/>
    let bonusTitle = <h2>{this.state.bonusTitle}</h2>

    if (this.state.creatureSet == false) this.determineCreature()

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

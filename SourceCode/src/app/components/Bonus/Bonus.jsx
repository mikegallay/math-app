/**
 * Bonus component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';
import ReactHowler from 'react-howler'
import {creatureList,firebaseAuth,ref} from "../../config/constants";

import './Bonus.scss';
import gems from '../../images/gems.png';
import glow from '../../images/glow-wedge.png';
import poop from '../../images/icon_sunglasses.png';
const creatures = require.context('../../images/creatures', true);

const localUser = "localUser";
let creaturePool = [];

const minTrainingBonus = 500
const minLevelBonus = 60

export default class Bonus extends React.Component {
  constructor(props) {
    super(props);
    // console.log('bonus',props);
    let visible = props.openBonus ? props.openBonus : 'init false';
    let operator = this.props.operator;

    let kingdom = 'forest';
    if (operator == 'sub') kingdom = 'rock'
    if (operator == 'mul') kingdom = 'water'
    if (operator == 'div') kingdom = 'fire'

    this.state = {
      visible,
      creatureSet:false,
      bonusImg:'default',
      creature:'default',
      bonusTitle:'default',
      kingdom
    };
  }

  componentWillReceiveProps(props){
    // console.log('did update',props);
    if (props.openBonus != this.state.visible) {
      // console.log('here');
      this.setState({visible:props.openBonus})

    }
  }

  componentDidMount(){
    this.determineCreature()
  }

  selectCreature(operator,locUser){
    let rand = this.rand(0,creaturePool.length-1);
    return creaturePool[rand];
  }

  setCreature(operator,creature){
    // console.log('setCreature',operator,creature);
    let creatureRef = creatureList.math[operator][creature];

    let title = creatureRef.name + '!'
    let imgsrc = creatures(`./${creatureRef.img}.png`);

    return {bonusImg:imgsrc,bonusTitle:title}
  }

  saveCreature(operator,creature,locUser){
    locUser.creatures[operator][creature] = true
    localStorage.setItem(localUser, JSON.stringify(locUser));

    let userRef = ref.ref('/users/' + locUser.userid + '/creatures/' + operator + "/" + creature );
    userRef.set(locUser.creatures[operator][creature]);
  }

  addGems(score,locUser){
    //add the gems
    let currGems = locUser.gems + Math.floor(score/100);
    locUser.gems = currGems
    localStorage.setItem(localUser, JSON.stringify(locUser));

    let userRef = ref.ref('/users/' + locUser.userid + '/gems');
    userRef.set(locUser.gems);
  }

  determineCreature(){
    // console.log('determine creature',this.props.score);

    creaturePool = [];
    var locUser = JSON.parse(localStorage.getItem(localUser));
    let operator = this.props.operator
    let bonusImg = gems
    let creature = 'default';
    let score = this.props.score;
    let accuracy = this.props.accuracy;
    let bonus = this.props.bonus;
    let bonusTitle = 'You found a pile of gems!';
    let creatures = locUser.creatures[operator];

    if (this.props.level == 0){
      //you are training
      //check to see if your score warrants a creature

      let allTrainingCreaturesUnlocked = (creatures.L1_1_1 && creatures.L1_1_2 && creatures.L1_1_3);
      if (!allTrainingCreaturesUnlocked && bonus == 2){
        //all three training creatures are NOT unlocked
        if (score >= creatureList.math[operator].L1_1_1.reward) creaturePool.push('L1_1_1');
        if (score >= creatureList.math[operator].L1_1_2.reward) creaturePool.push('L1_1_2');
        if (score >= creatureList.math[operator].L1_1_3.reward) creaturePool.push('L1_1_3');

        creature = this.selectCreature(operator,locUser);

        var creatureData = this.setCreature(operator,creature);
        bonusImg = creatureData.bonusImg;
        bonusTitle = creatureData.bonusTitle;

        this.saveCreature(operator,creature,locUser);

      } else {
        this.addGems(score,locUser)
      }

    } else if (this.props.level == 1 && bonus == 2){
      // console.log('bonus in level1');
      if (accuracy >= minLevelBonus){
        if (accuracy >= creatureList.math[operator].L2_1_1.reward) creaturePool.push('L2_1_1');
        if (accuracy >= creatureList.math[operator].L2_1_2.reward) creaturePool.push('L2_1_2');
        if (accuracy >= creatureList.math[operator].L2_1_3.reward) creaturePool.push('L2_1_3');
        if (accuracy >= creatureList.math[operator].L2_2_1.reward) creaturePool.push('L2_2_1');
        if (accuracy >= creatureList.math[operator].L2_2_2.reward) creaturePool.push('L2_2_2');
        if (accuracy >= creatureList.math[operator].L2_2_3.reward) creaturePool.push('L2_2_3');

        creature = this.selectCreature(operator,locUser);

        var creatureData = this.setCreature(operator,creature);
        bonusImg = creatureData.bonusImg;
        bonusTitle = creatureData.bonusTitle;

        this.saveCreature(operator,creature,locUser);
      }

      let allLevelCreaturesUnlocked = (creatures.L2_1_1 && creatures.L2_1_2 && creatures.L2_1_3 && creatures.L2_2_1 && creatures.L2_2_2 && creatures.L2_2_3);

      //all level 1 creatures released, unlock level2 and the staff
      if (allLevelCreaturesUnlocked && locUser.gamemath[operator].unlocked2) {
        locUser.gamemath[operator].unlocked2 = true;
        locUser.staffs[this.state.kingdom].ready = true;
        localStorage.setItem(localUser, JSON.stringify(locUser));

        let userRef = ref.ref('/users/' + locUser.userid + '/gamemath/' + operator + "/unlocked2");
        userRef.set(locUser.gamemath[operator].unlocked2);

        let staffRef = ref.ref('/users/' + locUser.userid + '/staffs/' + this.state.kingdom + "/ready");
        staffRef.set(locUser.staffs[this.state.kingdom].ready);
      }

    } else if (this.props.level == 2 && bonus == 2){
      // console.log('bonus in level2');
      console.log('creature pool',creaturePool);
      if (accuracy >= minLevelBonus){
        if (accuracy >= creatureList.math[operator].L3_1_1.reward) creaturePool.push('L3_1_1');
        if (accuracy >= creatureList.math[operator].L3_1_2.reward) creaturePool.push('L3_1_2');
        if (accuracy >= creatureList.math[operator].L3_1_3.reward) creaturePool.push('L3_1_3');
        if (accuracy >= creatureList.math[operator].L3_2_1.reward) creaturePool.push('L3_2_1');
        if (accuracy >= creatureList.math[operator].L3_2_2.reward) creaturePool.push('L3_2_2');
        if (accuracy >= creatureList.math[operator].L3_2_3.reward) creaturePool.push('L3_2_3');
        if (accuracy >= creatureList.math[operator].L3_3_1.reward) creaturePool.push('L3_3_1');
        if (accuracy >= creatureList.math[operator].L3_3_2.reward) creaturePool.push('L3_3_2');
        if (accuracy >= creatureList.math[operator].L3_3_3.reward) creaturePool.push('L3_3_3');
        if (accuracy >= creatureList.math[operator].L3_4_1.reward) creaturePool.push('L3_4_1');
        if (accuracy >= creatureList.math[operator].L3_4_2.reward) creaturePool.push('L3_4_2');
        if (accuracy >= creatureList.math[operator].L3_4_3.reward) creaturePool.push('L3_4_3');

        creature = this.selectCreature(operator,locUser);

        var creatureData = this.setCreature(operator,creature);
        bonusImg = creatureData.bonusImg;
        bonusTitle = creatureData.bonusTitle;

        this.saveCreature(operator,creature,locUser);
      }
    } else{
      //didn't do well enough for a creature release in training. have some gems
      this.addGems(score,locUser);
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
    // if (num < 10) num = "0" + num;
    return num;
  }

  render() {

    let bonusImg = <img className="bonus-item" src={this.state.bonusImg} width="250" height="250"/>
    let bonusTitle = '<h2>'+this.state.bonusTitle+'</h2>'

    // if (this.state.creatureSet == false) this.determineCreature()

    let headerImg = <div onClick={() => this.closeBonus()} className={`header-img-wrapper ${this.state.visible}`}>{bonusImg}</div>

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
            <div className="bonus-title" dangerouslySetInnerHTML={{__html:bonusTitle}}>
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

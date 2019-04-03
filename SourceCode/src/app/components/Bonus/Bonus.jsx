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

// const trainingBonus = 5000;
// const level1Bonus = 10000;
// const level2Bonus = 20000;
// const finalBonus = 50000;

export default class Bonus extends React.Component {
  constructor(props) {
    super(props);
    console.log('bonus',props);
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

  componentDidMount(){
    this.determineCreature()
  }

  setCreature(operator,creature){
    console.log('setCreature',operator,creature);
    let creatureRef = creatureList.math[operator][creature];

    let title = creatureRef.name + '!'
    let imgsrc = creatures(`./${creatureRef.img}.png`);

    // bonusImg = imgsrc
    // bonusTitle = title
    console.log('imgsrc',imgsrc);

    return {bonusImg:imgsrc,bonusTitle:title}
  }

  saveCreature(operator,creature,locUser){
    locUser.creatures[operator][creature] = true
    localStorage.setItem(localUser, JSON.stringify(locUser));

    let userRef = ref.ref('/users/' + locUser.userid + '/creatures/' + operator + "/" + creature );
    userRef.set(locUser.creatures[operator][creature]);
  }

  addGems(bonus,locUser){
    //add the gems
    let currGems = locUser.gems + bonus
    locUser.gems = currGems
    localStorage.setItem(localUser, JSON.stringify(locUser));

    let userRef = ref.ref('/users/' + locUser.userid + '/gems');
    userRef.set(locUser.gems);
  }

  determineCreature(){
    console.log('determine creature');
    var locUser = JSON.parse(localStorage.getItem(localUser));
    let operator = this.props.operator
    let bonusImg = gems
    // let coinText = 'coins'
    let creature = 'default';
    let bonus = this.props.bonus;
    let creaturePool = []
    // if (bonus == 1) coinText = 'coin'
    let bonusTitle = 'You found a pile of gems!';// + ' ' + bonus + ' ' + coinText + '!'

    // let creatureBonus = trainingBonus;
    // if (this.props.level == 1) creatureBonus = level1Bonus;
    // if (this.props.level == 2) creatureBonus = level2Bonus;
    // console.log('BONUS',bonus,locUser);

    if (this.props.level == 0){
      //you are training
      //check to see if your score warrants a creature
      let creatures = locUser.creatures[operator];
      let allTrainingCreaturesUnlocked = (creatures.L1_1_1 && creatures.L1_1_2 && creatures.L1_1_3);
      if (!allTrainingCreaturesUnlocked && bonus > 500){
          //all three training creatures are NOT unlocked
          if (bonus > creatureList.math[operator].L1_1_1.reward) creaturePool.push('L1_1_1');
          if (bonus > creatureList.math[operator].L1_1_2.reward) creaturePool.push('L1_1_2');
          if (bonus > creatureList.math[operator].L1_1_3.reward) creaturePool.push('L1_1_3');


        console.log('hey',bonus,creatureList.math[operator].L1_1_1.reward,creaturePool.length-1);
        let rand = this.rand(0,creaturePool.length-1);
        console.log('rand',rand);
        creature = creaturePool[rand];
        console.log(creaturePool,allTrainingCreaturesUnlocked);

        var creatureData = this.setCreature(operator,creature);

        bonusImg = creatureData.bonusImg;
        bonusTitle = creatureData.bonusTitle;

        console.log('bonusTitle',bonusTitle);

        this.saveCreature(operator,creature,locUser);
      }else{
        this.addGems(bonus,locUser)
      }

    }else{
      //over 10000 (creatureBonus) signifies that a creature has been unlocked
      //this gets set in GamePlay

      //look at making the bonus only for training.
      if (bonus >= creatureBonus && this.state.visible){
        //randomize logic for rewards

        // let rareCreature = (bonus > rareBonus && Math.random()*100 > 80) ? true : false;

        let rand = this.rand(1,3)
        let rand2 = this.rand(1,2);
        creature = 'L' + (this.props.level + 1) + "_" + rand2 + "_" + rand;
        console.log('bonus creature',creature);
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
      }else{
        this,addGems(bonus,locUser);
      }
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

    let bonus = <img className="bonus-item" src={this.state.bonusImg} width="250" height="250"/>
    let bonusTitle = '<h2>'+this.state.bonusTitle+'</h2>'

    // if (this.state.creatureSet == false) this.determineCreature()

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

/**
 * Creatures component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';
import { Link } from 'react-router-dom';

import './Creatures.scss';
import SecondaryNav from '../SecondaryNav/SecondaryNav';
// const creatures = require.context('../../images/creatures', true);
import sprite from '../../images/creatures/sprite.gif';
import {creatureList,creatureIds,spriteQuotes,hideTimer} from "../../config/constants";

const localUser = "localUser";

export default class Creatures extends React.Component {
  constructor(props) {
    super(props);
    let hidden = true;
    this.state = {hidden};

    //check current high score
    // localStorage.setItem(localUser, JSON.stringify(existingData));
    var locUser = JSON.parse(localStorage.getItem(localUser));
    // console.log('main',locUser, (locUser));

  }

  componentWillMount(){
    //hide the layout until the css is loaded
    let hider = setTimeout(() => {
      let hidden = false
      this.setState({hidden});
    }, hideTimer)
  }

  /*renderStyles(operator,id){
    console.log(operator,id);
    var imgRef = creatureList.math[operator][id].img;
    var imgSrc = creatures(`./${imgRef}.png`);
    return {}
    return {
      backgroundImage:'url(' + imgSrc + ')',
      backgroundSize: 'cover'
    }
  }*/

  getCreatureName(operator,id){
    return creatureList.math[operator][id].name;
  }

  getCreatureFreq(operator,id){
    return creatureList.math[operator][id].freq;
  }

  getQuote(){
    let count = spriteQuotes.length-1;
    let rand = Number(this.rand(0,count));
    console.log(count,rand,spriteQuotes);
    return spriteQuotes[rand];

  }

  rand(min,max){
    var num = Math.floor(Math.random() * ((max-min)+1) + min)
    if (num < 10) num = "0" + num;
    return num;
  }

  createCreatureList(operand,locUser){
    let displayArray = [];

    let output = creatureIds.map((arr,idx) => {
      let hasCreature = locUser.creatures[operand][arr];
      let name = this.getCreatureName(operand,arr);
      let freq = this.getCreatureFreq(operand,arr);
      let levelSection = ''

      let level = '';
      if (idx == 0) level = "Training";
      if (idx == 3) level = "Level 1";
      if (idx == 9) level = "Level 2";
      if (idx == 0 || idx == 3 || idx == 9){
        displayArray.push(<li key={level} className="levelsection">{level}</li>)
      }
      let creature = <li key={idx}>
        <div className={`creature ${operand} ${arr} ${(hasCreature)?'gotit':'notyet'}`}>?</div>
        <div className={`creature-freq freq-key ${freq}`}>{freq}</div>
        <div className="creature-name" dangerouslySetInnerHTML={{__html:(hasCreature)?name:'???'}}></div>
      </li>;
        displayArray.push(creature)
    })
    return displayArray;
  }

  render() {
    var locUser = JSON.parse(localStorage.getItem(localUser));
    let opacity = (!this.state.hidden)?1:0
    let styles = {opacity};

    return (
      <div className="creatures main">
        <div className="main-fade" style={styles}>
          <div className="wrapper">
            <div className="sprite-wrapper">
              <div className="sprite"><img src={sprite}/></div>
              <div className="carrot"></div>
              <div className="sprite-message"><p>{this.getQuote()}</p></div>
            </div>
            <SecondaryNav currpage="creatures"/>
            <p className="luckiest-guy">Have you rescued all the</p>
            <h1>Creatures?</h1>
            <div className="freq-legend">
              <div className="freq-legend-item"><span className="freq-key common">Common</span><span className="freq-name">Common</span></div>
              <div className="freq-legend-item"><span className="freq-key rare">Rare</span><span className="freq-name">Rare</span></div>
              <div className="freq-legend-item"><span className="freq-key ultrarare">Ultra Rare</span><span className="freq-name">Ultra Rare</span></div>
            </div>
            <div className="creature-wrapper">
              <div className="creature-section">
                <h4 className="add">Addition-ville</h4>
                <ul className="add creature-list">
                  {this.createCreatureList('add',locUser)}
                </ul>
                <h4 className="sub">Subtraction-berg</h4>
                <ul className="sub creature-list">
                  {this.createCreatureList('sub',locUser)}
                </ul>
                <h4 className="mul">Multiplication Land</h4>
                <ul className="mul creature-list">
                  {this.createCreatureList('mul',locUser)}
                </ul>
                <h4 className="div">Division Town</h4>
                <ul className="div creature-list">
                  {this.createCreatureList('div',locUser)}
                </ul>
                <h4 className="ran">Final Battle</h4>
                <div className="ran creature-list queen-list">
                  <div className='queen-wrapper'>
                    <div className={`creature ran queen ${(locUser.creatures.ran.queen)?'gotit':'notyet'}`}><span>?</span></div>
                    <div className={`creature-freq freq-key ultrarare`}>ultra rare</div>
                    <div className="creature-name">{((locUser.creatures.ran.queen))?this.getCreatureName('ran','queen'):'???'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

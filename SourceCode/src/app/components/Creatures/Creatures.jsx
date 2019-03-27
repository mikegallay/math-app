/**
 * Creatures component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';
import { Link } from 'react-router-dom';

import './Creatures.scss';
const creatures = require.context('../../images/creatures', true);
import {creatureList,creatureIds} from "../../config/constants";

const localUser = "localUser";

export default class Creatures extends React.Component {
  constructor(props) {
    super(props);
    let hidden = true;
    this.state = {hidden};

    //check current high score
    // localStorage.setItem(localUser, JSON.stringify(existingData));
    var locUser = JSON.parse(localStorage.getItem(localUser));
    console.log('main',locUser, (locUser));

  }

  componentWillMount(){
    //hide the layout until the css is loaded
    let hider = setTimeout(() => {
      let hidden = false
      this.setState({hidden});
    }, 1000)
  }

  renderStyles(operator,id){
    console.log(operator,id);
    var imgRef = creatureList.math[operator][id].img;
    var imgSrc = creatures(`./${imgRef}.png`);
    return {}
    return {
      backgroundImage:'url(' + imgSrc + ')',
      backgroundSize: 'cover'
    }
  }

  getCreatureName(operator,id){
    return creatureList.math[operator][id].name;
  }

  getCreatureFreq(operator,id){
    return creatureList.math[operator][id].freq;
  }

  creatureMap(operand,locUser){

    let output = creatureIds.map((arr,idx) => {
      let hasCreature = locUser.creatures[operand][arr];
      console.log(operand,arr,hasCreature);
      let name = this.getCreatureName(operand,arr);
      let freq = this.getCreatureFreq(operand,arr);
      let level = '';
      if (idx == 0) level = "level1";
      if (idx == 3) level = "level2";
      if (idx == 9) level = "level3";
        return(
          <li className={level} key={idx}>
            <div className={`creature ${operand} ${arr} ${(hasCreature)?'gotit':'notyet'}`}>?</div>
            <div className={`creature-freq freq-key ${freq}`}>{freq}</div>
            <div className="creature-name">{(hasCreature)?name:'???'}</div>
          </li>
        )
    })
    return output
  }

  render() {
    var locUser = JSON.parse(localStorage.getItem(localUser));
    let opacity = (!this.state.hidden)?1:0
    let styles = {opacity};

    return (
      <div className="creatures main">
        <div className="main-fade" style={styles}>
          <div className="wrapper">
            <h1>Creatures</h1>
            <Link to='/navigation' className='stats-btn'> Main Menu </Link>
            <Link to='/statistics' className='stats-btn'> View Statistics </Link>
            <span className="active">View Creatures</span>
            <div className="freq-legend">
              <div className="freq-legend-item"><span className="freq-key common">Common</span><span className="freq-name">Common</span></div>
              <div className="freq-legend-item"><span className="freq-key rare">Rare</span><span className="freq-name">Rare</span></div>
              <div className="freq-legend-item"><span className="freq-key ultrarare">Ultra Rare</span><span className="freq-name">Ultra Rare</span></div>
            </div>
            <div className="creature-wrapper">
              <div className="creature-section">
                <h4>Addition</h4>
                <ul className="creature-list">
                  {this.creatureMap('add',locUser)}
                </ul>
                <h4>Subtraction</h4>
                <ul className="creature-list">
                  {this.creatureMap('sub',locUser)}
                </ul>
                <h4>Multiplication</h4>
                <ul className="creature-list">
                  {this.creatureMap('mul',locUser)}
                </ul>
                <h4>Division</h4>
                <ul className="creature-list">
                  {this.creatureMap('div',locUser)}
                </ul>
                <h4>Random</h4>
                <div className="creature-list queen-list">
                  <div className='queen-wrapper'>
                    <div className={`creature ran queen ${(locUser.creatures.ran.queen)?'gotit':'notyet'}`}><span>?</span></div>
                    <div className={`creature-freq freq-key ultrarare`}>ultra rare</div>
                    <div className="creature-name">{((locUser.creatures.ran.queen))?'Queen':'???'}</div>
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

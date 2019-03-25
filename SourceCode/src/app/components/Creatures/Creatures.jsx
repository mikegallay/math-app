/**
 * Creatures component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';
import { Link } from 'react-router-dom';

import './Creatures.scss';
const creatures = require.context('../../images/creatures', true);
import {creatureList} from "../../config/constants";

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
    var imgRef = creatureList.math[operator][id].img;
    var imgSrc = creatures(`./${imgRef}.png`);
    return {
      backgroundImage:'url(' + imgSrc + ')',
      backgroundSize: 'cover'
    }
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
            <div className="creature-wrapper">
              <div className="creature-section">
                <h2>Addition - Common</h2>
                <ul className="creature-list">
                 <li style={this.renderStyles('add','c01')} className={`creature add c01 ${(locUser.creatures.add.c01)?'gotit':'notyet'}`}>?</li>
                 <li style={this.renderStyles('add','c02')} className="creature gotit">?</li>
                  <li className={`creature add c01 ${(locUser.creatures.add.c01)?'gotit':'notyet'}`}>?</li>
                  {/*<li style={this.renderStyles()} className={`creature add c02 ${(locUser.creatures.add.c02)?'gotit':'notyet'}`}>C02</li>
                  <li className={`creature add c03 ${(locUser.creatures.add.c03)?'gotit':'notyet'}`}>C03</li>
                  <li className={`creature add c02 ${(locUser.creatures.add.c02)?'gotit':'notyet'}`}>C03</li>*/}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

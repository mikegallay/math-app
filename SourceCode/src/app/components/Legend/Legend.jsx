/**
 * Navigation component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';
import { Link } from 'react-router-dom';
import {hideTimer} from "../../config/constants";
import './Legend.scss';
import sprite from '../../images/creatures/sprite.gif';

export default class Legend extends React.Component {
  constructor(props) {
    super(props);
    let hidden = true;
    this.state = {hidden};
  }

  componentWillMount(){
    //hide the layout until the css is loaded
    let hider = setTimeout(() => {
      let hidden = false
      this.setState({hidden});
    }, hideTimer)
  }

  render() {
    let opacity = (!this.state.hidden)?1:0
    let styles = {opacity};
    const titlespan = {fontSize: ".7em"}
    let originalStory = <div className="story">
      <p>It was the time of noble heroes, creatures of legend and dark wizardry. You, however come from humble beginnings, a poor villager, who unknown to most, has always had a gifted mind capable of solving problems and a thirst for knowledge and adventure.</p>
      <p>One day, bored with your life in the village, you set out into the world to seek the adventure you have always craved. You soon find yourself far from home and further than you have ever traveled.  After weeks of wandering, you find yourself in a strange new land.  This peaceful land is bathed in a faint shadow and feels different, almost <em>magical!</em></p>
      <p><img style={{float:'left',marginRight:'4px'}} src={sprite} width="72" height="72"/>“Is it really you?” shouts a high-pitched voice. You spin around to see small creature; oddly cute and unlike any you have ever encountered. She is quivering, clearly terrified but her voice is also full of hope. “The Legend said you would arrive today!”</p>
      <p>“Our kingdom was peaceful and everyone in our four lands used their magic for good. That was until an evil Wizard arrived. He used a powerful magic we had never seen and captured our Queen. Once our Queen was emprisoned, the Wizard easily captured every creature in the entire land. I am the last one who is free!”</p>
      <p>The creature pauses for a second and with a faded whisper she continues, “We have a legend. It tells of a stranger smart enough to learn our magic amd save our people in our darkest time. That time is now, and that stranger is you!”</p>
    </div>

    return (
      <div className="main legend">
        <div className="main-fade" style={styles}>
          <div className="wrapper">
            <div className="story">
              <h1 className="legend-title"><span style={titlespan}>The</span> Legend <span style={titlespan}>of the </span>QuestCaster</h1>
              <p>The island kingdom of Mathicus has been overtaken by an evil wizard who has trapped all of its citizens in cages. No village was spared and the creatures are terrified.</p>
              <p>You are the kingdom's only hope and the power of math is the only thing that will defeat the wizard and free the poor creatures.</p>
              <p> Practice your skills by "training" to make sure you know addition, subtraction, multiplication and division as well as you can. Then, when you are ready, it is time to "battle".</p>
              <p>Do you have what it takes? Everyone is counting on you. You are the kingdom's only hope of restoring peace.</p>
            </div>
            <div className='legend-buttons'>
              <Link to='/login' className='landing-btn mdl-button mdl-js-button mdl-button--raised mdl-button--accent'><i className="material-icons">terrain</i> BEGIN QUEST </Link>
              <Link to='/help' className='mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored'><i className="material-icons">help</i></Link>
            </div>
            <p className="credit">© 2018 Mike Gallay</p>
          </div>
        </div>
      </div>
    );
  }
}

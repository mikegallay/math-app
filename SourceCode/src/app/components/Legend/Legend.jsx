/**
 * Navigation component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';
import { Link } from 'react-router-dom';

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
    }, 1000)
  }

  render() {
    let opacity = (!this.state.hidden)?1:0
    let styles = {opacity};

    return (
      <div className="main legend">
        <div className="main-fade" style={styles}>
          <div className="wrapper" style={styles}>
            <div className="story">
              <p>You left your childhood home in search of adventure and knowledge. One the road for weeks, you immediately feel different as you cross into land that lays before you. You know something special is starting - something that will change you and forever be known as ...</p>
              <h1 className="legend-title">The legend of the&nbsp;Quest Caster</h1>
              <p>Throughout its entire history, the kingdom of MATH, along with all of the creatures living there, had always been peaceful. They all lived happily under the rule of their queen, QUEENIE McBOOMBOOM. She made sure all her loyal subjects were safe and taken care of. She loved them and they loved her.</p>
              <p>Then one dark day, everything changed. Out of nowhere a powerful wizard, WIZ BANG BANG, charged into the kingdom and captured the queen using a strange and powerful "magic". With the queen captured, it didn't take long for WIZ to round up all but one creature in the kingdom.</p>
              <p><img style={{float:'left',marginRight:'4px'}} src={sprite} width="72" height="72"/>SPROUT finds you shortly after you arrive. To SPROUT, you are the strange visitor the legend foretold of. The one who would save the kingdom in its hour of need. It is now your destiny to beat the Wizard with his own magic, rescue the creatures and restore balance back to the kingdom.</p>
              <p>SPROUT sneaks you through an underground tunnel into a secret room filled with scrolls containing the spells the WIZARD used to imprison the kingdom. You have everything you need to save QUEENIE and all the trapped creatures.</p>
              <p>Are you ready to fullfill your legendary destiny?</p>
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

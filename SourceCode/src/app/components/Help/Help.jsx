/**
 * Help component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';
import { Link } from 'react-router-dom';
import {hideTimer} from "../../config/constants";
import './Help.scss';
import SecondaryNav from '../SecondaryNav/SecondaryNav';

const paragraph = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet natus sint provident vel ab reprehenderit cum soluta, suscipit facere nisi sed earum repellendus fuga debitis, nam molestiae minima voluptates possimus.<br><br>Bully!<br>'
// const locUser = JSON.parse(localStorage.getItem('localUser'));
const data = [
  {
    title: 'Save to Homescreen',
    paragraph: 'Adding this webpage to your homescreen will launch the site as if it was an app and give you the best game experience. Return to the <a href="/">homescreen</a> before following the steps below. <br><br><strong>ANDROID DEVICES</strong><br><br><strong><em>Open the menu:</em></strong> Click on the icon at the top right of your screen (3 vertical dots).<br><br><strong><em>Add Shortcut:</em></strong> In this menu, select "Bookmarks" option. From the next screen select the icon for QuestCaster. Finally click on the "Add shortcut to desktop" option.<br><br><strong>iOS DEVICES</strong><br><br><strong><em>Open the menu:</em></strong> Tap the middle icon at the bottom of your screen (box with up arrow).<br><br><strong><em>Add to Home Screen:</em></strong> In this menu, click the "Add to Home Screen" icon with a plus sign which reads.<br><br><strong><em>Choose a name:</em></strong> In the final screen enter "QuestCaster" as the name for this shortcut.<br>'
  },
  {
    title: 'Delete Account',
    paragraph: 'If for any reason you want to delete your account and all the data associated with it, send an email to <a href="mailto:info@questcaster.com">info@questcaster.com</a> and be sure to include your username. We will send you an email conce we have completed your request.'
  },
  {
    title: 'Map',
    paragraph: 'The map is your main navigation for choosing which game to play. It is divided into 4 kingdoms: addition, substraction, multiplication and division. Each kingdom has 3 game modes you can play: training, battle1 and battle2. Each mode is designed to be a little harder to test your speed and accuracy. Locked levels are grayed out and you will not be able to play them.'
  },
  {
    title: 'Game Play/General',
    paragraph: 'to do'
  },
  {
    title: 'Game Play/Training',
    paragraph: 'The first level of all four kingdoms is training. Your objective is to answer as many questions as you can. In this mode you are given three answers to choose from.<br><br>If you correctly answer the question, it will be highlighted in green for a few seconds and you will be rewarded points. See <em>"Game Play/General"</em> for scoring rules.<br><br>Answer incorrectly and your choice will be highlighted in red, but the game shows you the correct answer to help you learn. Each wrong answer deducts one bar from your health. Get three wrong answer and your turn is over. <strong>Don’t worry! You can start another round right away!</strong>'
  },
  {
    title: 'Game Play/Battle',
    paragraph: 'In the second two levels of all four kingdoms you are battling the wizard. You have one minute to defeat the wizard before he is able to charge up a spell that will stun you and end the round. In this mode you must manually enter you answer one number at a time. To cast you answer at the wizard tap the staff icon to the right of the number pad. Each correct answer will take health away from the wizard. <br><br>Each correct will be highlighted in green for a split second. See <em>"Game Play/General"</em> for scoring rules.<br><br>Answer incorrectly and your answer will be highlighted in red. Even if you can defeat the wizard, incorrect answers will affect your accuracy and final prize. If the wizard stuns you, you will receive no prize and the round is over.<strong>Don’t worry! You can start another round right away!</strong>'
  },
  {
    title: 'Staffs',
    paragraph: 'Staffs are unlocked by releasing all the creatures in the first battle level of each kingdom. Each staff has a unique casting animation and provides you with a boost that will help increase the damage you can do. There is only one staff available in each kingdom.<br><br>Purchasing staffs from the store requires gems, which can be earned while training. See <em>"Gems"</em> for more information.'
  },
  {
    title: 'Gems',
    paragraph: 'Gems, which can be used to buy staffs, are earned while playing in any kingdom. While training, you will receive gems once you have released all three creatures in that kingdom. The higher you score, the more gems you will earn. In battle, you will be awarded gems if your accuracy is not good enough to unlock a creature.'
  },
  {
    title: 'Creatures',
    paragraph: 'To save the kingdom, you must release/collect all the creatures that the wizard has captured. There are 3 available in each training level, 6 in the first battle level, and 9 in the second battle level.<br><br>If you defeat the wizard, you’re accuracy determines which creatures you might get. Some creatures are harder to find than others, and even if you don’t make mistakes you won’t be guaranteed the rarest ones. It may take several battles to unlock everyone.'
  },
  {
    title: 'The Final Battle',
    paragraph: 'Once you rescue all the creatures in each kingdom, you unlock the final battle and have a chance to face the final battle. In a final attempt to stop you, the wizard casts a spell that summons a powerful dragon, whose randomizes the questions you must answer.<br><br>It is a mental challenge that only the smartest and quicket QuestCaster can win. <strong>Nothing short of a perfect score will free the queen and save the kingdom!</strong>'
  },
]

export default class Help extends React.Component {
  constructor(props) {
    super(props);
    let hidden = true;
    var locUser = JSON.parse(localStorage.getItem('localUser'));
    this.state = {hidden,locUser};
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

    let navRender = <SecondaryNav currpage="help"/>;
    if (!this.state.locUser) navRender = <div className="no-locUser">
    <Link to='/login' className='help-btn mdl-button mdl-js-button mdl-button--raised mdl-button--accent'><i className="material-icons">terrain</i> QUEST </Link>
    <Link to='/legend' className='help-btn mdl-button mdl-js-button mdl-button--raised mdl-button--accent'><i className="material-icons">flare</i>LEGEND </Link>
    </div>

    return (
      <div className="help main">
        <div className="main-fade" style={styles}>
          <div className="wrapper">
            <h1>Help</h1>

            {navRender}
            <div className="intro">This section has FAQs, rules for game play, and tips to improve your experience. If you a having trouble with any aspect of the game please contact us at: <a href="mailto:info@questcaster.com">info@questcaster.com</a>.</div>
            <ul className='accordion-list'>
              {data.map((data, key) => {
                return (
                  <li className='accordion-list__item' key={key}>
                    <AccordionItem
                    title={data.title}
                    paragraph={data.paragraph}/>
                  </li>
                )
              })}
            </ul>

          </div>
        </div>
      </div>
    );
  }
}

class AccordionItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      opened: false
    }
  }

  render () {
    const {
      props: {
        paragraph,
        title
      },
      state: {
        opened
      }
    } = this

    return (
      <div className={`accordion-item ${this.state.opened?'accordion-item--opened':''}`}
          onClick={() => { this.setState({ opened: !opened }) }}>
        <div className={'accordion-item__line'}>
          <h3 className={'accordion-item__title'}>
            {title}
          </h3>
          <span className={'accordion-item__icon'}/>
        </div>
          <div className='accordion-item__inner'>
            <div className='accordion-item__content'>
              <p className='accordion-item__paragraph'
                dangerouslySetInnerHTML={{__html:paragraph}}>
              </p>
            </div>
          </div>
      </div>
    )
  }
}

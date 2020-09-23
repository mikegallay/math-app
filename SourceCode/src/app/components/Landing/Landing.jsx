/**
 * Navigation component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';
import { Link } from 'react-router-dom';
import {hideTimer} from "../../config/constants";
import './Landing.scss';

export default class Landing extends React.Component {
  constructor(props) {
    super(props);
    console.log('landing',props);
    let hidden = true;
    let cookies = false;
    this.state = {hidden,cookies};
  }

  componentWillMount(){
    //hide the layout until the css is loaded
    let cookies = (this.checkCookies() == null)?false:true;

    let hider = setTimeout(() => {
      let hidden = false
      this.setState({hidden,cookies});
    }, hideTimer)
  }

  checkCookies(){
    var cookiepolicy = JSON.parse(localStorage.getItem("cookiepolicy"));
    return cookiepolicy;
    // console.log('cookiepolicy',cookiepolicy);
  }

  acceptCookies(){
    var data = {accept:true}
    localStorage.setItem("cookiepolicy", JSON.stringify(data));
    this.setState({cookies:true});
    this.props.ateCookies();
  }

  render() {
    let opacity = (!this.state.hidden)?1:0
    let styles = {opacity};

    return (
      <div className="main landing">
        <div className="main-fade" style={styles}>
          <div className="wrapper">
            <p className="luckiest-guy">The Legend of the</p>
            <h1 className="landing-title">Quest Caster</h1>
            <div className="landing-buttons">
                <Link to='/legend' className='landing-btn mdl-button mdl-js-button mdl-button--raised mdl-button--accent'><i className="material-icons">brightness_7</i> NEW QUEST </Link>
                <Link to='/login' className='landing-btn mdl-button mdl-js-button mdl-button--raised mdl-button--accent'><i className="material-icons">terrain</i> CONTINUE </Link>
              </div>
              <p className="credit">© 2020 Michael Gallay</p>
          </div>
          <div className={`cookie-warning ${(this.state.hidden && !this.state.cookies)?'start':''} ${(this.state.cookies)?'remove':''}`}>
            <div className="cookie-content">
              <h5>Quest Caster requires cookies</h5>
              <p>
                This game uses your browser's local storage and other cookies to make game play possible and enable basic analytics. We will never sell your data, but to see how we use it, please review our <a href="/cookies" target="blank">cookie&nbsp;policy</a>. Unfortunately, if you are not willing or able to accept, you will not be able to play the game.
              </p>
              <button className='landing-btn mdl-button mdl-js-button mdl-button--raised mdl-button--accent' onClick={() => this.acceptCookies()}>I ACCEPT</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

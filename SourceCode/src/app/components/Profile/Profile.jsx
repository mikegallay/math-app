/**
 * Stats component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';
import { Link } from 'react-router-dom';
import {logout} from "../../services/auth";

import './Profile.scss';
import SecondaryNav from '../SecondaryNav/SecondaryNav';

const localUser = "localUser";
const appTokenKey = "appToken";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    let hidden = true;
    this.state = {hidden};

    //check current high score
    // localStorage.setItem(localUser, JSON.stringify(existingData));
    // var locUser = JSON.parse(localStorage.getItem(localUser));
    // console.log('main',locUser, (locUser));

    this.handleLogout = this.handleLogout.bind(this);

  }

  componentWillMount(){
    //hide the layout until the css is loaded
    let hider = setTimeout(() => {
      let hidden = false
      this.setState({hidden});
    }, 1000)
  }

  handleLogout() {
    // console.log('handleLogout');
     logout().then(function () {
         localStorage.removeItem(appTokenKey);
         this.props.history.push("/login");
         // console.log(this.props.history);
         console.log("user signed out from firebase");
     }.bind(this));
   }

  render() {
    var locUser = JSON.parse(localStorage.getItem(localUser));
    var addTrainHS = locUser.gamemath.add.training;
    var addBatt1HS = locUser.gamemath.add.battle1;
    var addBatt2HS = locUser.gamemath.add.battle2;
    var subTrainHS = locUser.gamemath.sub.training;
    var subBatt1HS = locUser.gamemath.sub.battle1;
    var subBatt2HS = locUser.gamemath.sub.battle2;
    var mulTrainHS = locUser.gamemath.mul.training;
    var mulBatt1HS = locUser.gamemath.mul.battle1;
    var mulBatt2HS = locUser.gamemath.mul.battle2;
    var divTrainHS = locUser.gamemath.div.training;
    var divBatt1HS = locUser.gamemath.div.battle1;
    var divBatt2HS = locUser.gamemath.div.battle2;
    var ranTrainHS = locUser.gamemath.ran.training;
    var ranBattHS = locUser.gamemath.ran.battle;
    // console.log('locuser',addPracHS);

    let opacity = (!this.state.hidden)?1:0
    let styles = {opacity};

    return (
      <div className="profile main">
        <div className="main-fade" style={styles}>
          <div className="wrapper">
            <h1>Profile</h1>
            <SecondaryNav currpage="profile"/>
            <div className="userinfo">Other content</div>

            <div className="username">
              <p className="luckiest-guy">Only You Can Save Us</p>
              <h3>{locUser.username}</h3>
              <Link to='/chooseusername' className="chooseusername">Want to change your username?</Link>
              <div>
                  <button
                      value="Sign Out"
                      className="mdl-button"
                      onClick={this.handleLogout}
                  >Sign Out</button>
              </div>
            </div>

            <div className="stat-list">
              <h3>High Scores</h3>
              <div className="stat-section">
                <h4>Add</h4>
                <p>Training: <span className="score">{addTrainHS}</span></p>
                <p>Level 1: <span className="score">{addBatt1HS}</span></p>
                <p>Level 2: <span className="score">{addBatt2HS}</span></p>
              </div>
              <div className="stat-section">
                <h4>Subtract</h4>
                <p>Training: <span className="score">{subTrainHS}</span></p>
                <p>Level 1: <span className="score">{subBatt1HS}</span></p>
                <p>Level 2: <span className="score">{subBatt2HS}</span></p>
              </div>
              <div className="stat-section">
                <h4>Multiply</h4>
                <p>Training: <span className="score">{mulTrainHS}</span></p>
                <p>Level 1: <span className="score">{mulBatt1HS}</span></p>
                <p>Level 2: <span className="score">{mulBatt2HS}</span></p>
              </div>
              <div className="stat-section">
                <h4>Divide</h4>
                <p>Training: <span className="score">{divTrainHS}</span></p>
                <p>Level 1: <span className="score">{divBatt1HS}</span></p>
                <p>Level 2: <span className="score">{divBatt2HS}</span></p>
              </div>
              <div className="stat-section">
                <h4>Random</h4>
                <p>Final Battle: <span className="score">{ranBattHS}</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

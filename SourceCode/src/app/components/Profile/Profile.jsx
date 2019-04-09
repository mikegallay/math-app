/**
 * Stats component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';
import { Link } from 'react-router-dom';
import {logout} from "../../services/auth";
import {ref} from "../../config/constants";

import './Profile.scss';
import SecondaryNav from '../SecondaryNav/SecondaryNav';

const localUser = "localUser";
const appTokenKey = "appToken";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    let hidden = true;
    var locUser = JSON.parse(localStorage.getItem(localUser));
    this.state = {hidden,locUser};

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

  //jump level functions for testing

  //training
  forest0(){
    let lu = this.state.locUser;
    lu.gamemath.add.unlocked1 = lu.creatures.add.L1_1_1 = lu.creatures.add.L1_1_2 = lu.creatures.add.L1_1_3 = true
    localStorage.setItem(localUser, JSON.stringify(lu));
    ref.ref('/users/' + lu.userid + '/creatures/add').set(lu.creatures.add);
  }
  rock0(){
    let lu = this.state.locUser;
    lu.gamemath.sub.unlocked1 = lu.creatures.sub.L1_1_1 = lu.creatures.sub.L1_1_2 = lu.creatures.sub.L1_1_3 = true
    localStorage.setItem(localUser, JSON.stringify(lu));
    ref.ref('/users/' + lu.userid + '/creatures/sub').set(lu.creatures.sub);
  }
  water0(){
    let lu = this.state.locUser;
    lu.gamemath.mul.unlocked1 = lu.creatures.mul.L1_1_1 = lu.creatures.mul.L1_1_2 = lu.creatures.mul.L1_1_3 = true
    localStorage.setItem(localUser, JSON.stringify(lu));
    ref.ref('/users/' + lu.userid + '/creatures/mul').set(lu.creatures.mul);
  }
  fire0(){
    let lu = this.state.locUser;
    lu.gamemath.div.unlocked1 = lu.creatures.div.L1_1_1 = lu.creatures.div.L1_1_2 = lu.creatures.div.L1_1_3 = true
    localStorage.setItem(localUser, JSON.stringify(lu));
    ref.ref('/users/' + lu.userid + '/creatures/div').set(lu.creatures.div);
  }
  all0(){
    this.forest0(); this.rock0(); this.water0(); this.fire0();
  }

  //level1
  forest1(){
    let lu = this.state.locUser;
    lu.gamemath.add.unlocked2 = lu.creatures.add.L2_1_1 = lu.creatures.add.L2_1_2 = lu.creatures.add.L2_1_3 = lu.creatures.add.L2_2_1 = lu.creatures.add.L2_2_2 = lu.creatures.add.L2_2_3 = true
    localStorage.setItem(localUser, JSON.stringify(lu));
    ref.ref('/users/' + lu.userid + '/creatures/add').set(lu.creatures.add);
  }
  rock1(){
    let lu = this.state.locUser;
    lu.gamemath.sub.unlocked2 = lu.creatures.sub.L2_1_1 = lu.creatures.sub.L2_1_2 = lu.creatures.sub.L2_1_3 = lu.creatures.sub.L2_2_1 = lu.creatures.sub.L2_2_2 = lu.creatures.sub.L2_2_3 = true
    localStorage.setItem(localUser, JSON.stringify(lu));
    ref.ref('/users/' + lu.userid + '/creatures/sub').set(lu.creatures.sub);
  }
  water1(){
    let lu = this.state.locUser;
    lu.gamemath.mul.unlocked2 = lu.creatures.mul.L2_1_1 = lu.creatures.mul.L2_1_2 = lu.creatures.mul.L2_1_3 = lu.creatures.mul.L2_2_1 = lu.creatures.mul.L2_2_2 = lu.creatures.mul.L2_2_3 = true
    localStorage.setItem(localUser, JSON.stringify(lu));
    ref.ref('/users/' + lu.userid + '/creatures/mul').set(lu.creatures.mul);
  }
  fire1(){
    let lu = this.state.locUser;
    lu.gamemath.div.unlocked2 = lu.creatures.div.L2_1_1 = lu.creatures.div.L2_1_2 = lu.creatures.div.L2_1_3 = lu.creatures.div.L2_2_1 = lu.creatures.div.L2_2_2 = lu.creatures.div.L2_2_3 = true
    localStorage.setItem(localUser, JSON.stringify(lu));
    ref.ref('/users/' + lu.userid + '/creatures/div').set(lu.creatures.div);

  }
  all1(){
    this.forest1(); this.rock1(); this.water1(); this.fire1();
  }
  forest2(){
    let lu = this.state.locUser;
    lu.creatures.add.L3_1_1 = lu.creatures.add.L3_1_2 = lu.creatures.add.L3_1_3 = lu.creatures.add.L3_2_1 = lu.creatures.add.L3_2_2 = lu.creatures.add.L3_2_3 = lu.creatures.add.L3_3_1 = lu.creatures.add.L3_3_2 = lu.creatures.add.L3_3_3 = lu.creatures.add.L3_4_1 = lu.creatures.add.L3_4_2 = lu.creatures.add.L3_4_3 = true
    localStorage.setItem(localUser, JSON.stringify(lu));
    ref.ref('/users/' + lu.userid + '/creatures/add').set(lu.creatures.add);
  }
  rock2(){
    let lu = this.state.locUser;
    lu.creatures.sub.L3_1_1 = lu.creatures.sub.L3_1_2 = lu.creatures.sub.L3_1_3 = lu.creatures.sub.L3_2_1 = lu.creatures.sub.L3_2_2 = lu.creatures.sub.L3_2_3 = lu.creatures.sub.L3_3_1 = lu.creatures.sub.L3_3_2 = lu.creatures.sub.L3_3_3 = lu.creatures.sub.L3_4_1 = lu.creatures.sub.L3_4_2 = lu.creatures.sub.L3_4_3 = true
    localStorage.setItem(localUser, JSON.stringify(lu));
    ref.ref('/users/' + lu.userid + '/creatures/sub').set(lu.creatures.sub);
  }
  water2(){
    let lu = this.state.locUser;
    lu.creatures.mul.L3_1_1 = lu.creatures.mul.L3_1_2 = lu.creatures.mul.L3_1_3 = lu.creatures.mul.L3_2_1 = lu.creatures.mul.L3_2_2 = lu.creatures.mul.L3_2_3 = lu.creatures.mul.L3_3_1 = lu.creatures.mul.L3_3_2 = lu.creatures.mul.L3_3_3 = lu.creatures.mul.L3_4_1 = lu.creatures.mul.L3_4_2 = lu.creatures.mul.L3_4_3 = true
    localStorage.setItem(localUser, JSON.stringify(lu));
    ref.ref('/users/' + lu.userid + '/creatures/mul').set(lu.creatures.mul);
  }
  fire2(){
    let lu = this.state.locUser;
    lu.creatures.div.L3_1_1 = lu.creatures.div.L3_1_2 = lu.creatures.div.L3_1_3 = lu.creatures.div.L3_2_1 = lu.creatures.div.L3_2_2 = lu.creatures.div.L3_2_3 = lu.creatures.div.L3_3_1 = lu.creatures.div.L3_3_2 = lu.creatures.div.L3_3_3 = lu.creatures.div.L3_4_1 = lu.creatures.div.L3_4_2 = lu.creatures.div.L3_4_3 = true
    localStorage.setItem(localUser, JSON.stringify(lu));
    ref.ref('/users/' + lu.userid + '/creatures/div').set(lu.creatures.div);
  }
  all2(){
    this.forest2(); this.rock2(); this.water2(); this.fire2();
  }

  render() {
    var locUser = JSON.parse(localStorage.getItem(localUser));
    var gems = locUser.gems;
    var staff = locUser.staffs.current;
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
            <div className="gems">Total Gems: {gems}</div>

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
              <div>Your unique user id is {locUser.userid}</div>
            </div>

            <div className="staff">
              <p>You currently have the {staff} staff equipped.</p>
              <Link to='/store'>Equip a different one?</Link>
            </div>

            <div className="jumpSettings">
              <h5>Jump Settings</h5>
              <button onClick={() => {this.forest0()}}>forest0</button>
              <button onClick={() => {this.rock0()}}>rock0</button>
              <button onClick={() => {this.water0()}}>water0</button>
              <button onClick={() => {this.fire0()}}>fire0</button>
              <button onClick={() => {this.all0()}}>all0</button><br/>
              <button onClick={() => {this.forest1()}}>forest1</button>
              <button onClick={() => {this.rock1()}}>rock1</button>
              <button onClick={() => {this.water1()}}>water1</button>
              <button onClick={() => {this.fire1()}}>fire1</button>
              <button onClick={() => {this.all1()}}>all1</button><br/>
              <button onClick={() => {this.forest2()}}>forest2</button>
              <button onClick={() => {this.rock2()}}>rock2</button>
              <button onClick={() => {this.water2()}}>water2</button>
              <button onClick={() => {this.fire2()}}>fire2</button>
              <button onClick={() => {this.all2()}}>all2</button>
            </div>

            <div className="stat-list">
              <h3>High Scores</h3>
              <div className="stat-section">
                <h4 className="corner-shadow">Add</h4>
                <p>Training: <span className="score">{addTrainHS}</span></p>
                <p>Level 1: <span className="score">{addBatt1HS}</span></p>
                <p>Level 2: <span className="score">{addBatt2HS}</span></p>
              </div>
              <div className="stat-section">
                <h4 className="corner-shadow">Subtract</h4>
                <p>Training: <span className="score">{subTrainHS}</span></p>
                <p>Level 1: <span className="score">{subBatt1HS}</span></p>
                <p>Level 2: <span className="score">{subBatt2HS}</span></p>
              </div>
              <div className="stat-section">
                <h4 className="corner-shadow">Multiply</h4>
                <p>Training: <span className="score">{mulTrainHS}</span></p>
                <p>Level 1: <span className="score">{mulBatt1HS}</span></p>
                <p>Level 2: <span className="score">{mulBatt2HS}</span></p>
              </div>
              <div className="stat-section">
                <h4 className="corner-shadow">Divide</h4>
                <p>Training: <span className="score">{divTrainHS}</span></p>
                <p>Level 1: <span className="score">{divBatt1HS}</span></p>
                <p>Level 2: <span className="score">{divBatt2HS}</span></p>
              </div>
              <div className="stat-section">
                <h4 className="corner-shadow">Random</h4>
                <p>Final Battle: <span className="score">{ranBattHS}</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

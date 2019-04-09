/**
 * Login component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';
import { Link } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import {ref,hideTimer} from "../../config/constants";

import './ChooseUsername.scss';

import {loginWithGoogle} from "../../services/auth";

const firebaseAuthKey = "firebaseAuthInProgress";
const localUser = "localUser";
const appTokenKey = "appToken";

export default class ChooseUsername extends React.Component {
  constructor(props) {
    super(props);

    //username option
    let username = '';
    let usernameAvailable = false
    let localUser = localStorage.getItem(localUser)
    let hidden = true;

    this.state = {username,usernameAvailable,localUser,hidden};

    this.hasUsername = this.hasUsername.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.checkUsername = this.checkUsername.bind(this);


  }

  componentDidMount() {
    let hider = setTimeout(() => {
      let hidden = false
      this.setState({hidden});
    }, hideTimer)
  }

    handleKeyUp(e) {
      // console.log('key up');
      let regex = /[^a-zA-Z0-9]+/gi;
      let target = e.target;
      target.value = target.value.replace(regex,"")

      // this.setState({username})
      this.checkUsername(target.value)
    }

    updateUsername() {
      //var currUser = localStorage.getItem('userid')
      var locUser = JSON.parse(localStorage.getItem(localUser))
      var userid = locUser.userid;

      locUser.username = this.state.username;

      let userRef = ref.ref('/users/' + locUser.userid + '/username');
      let usernameRef = ref.ref('/usernames/' + this.state.username);
      userRef.set(this.state.username);
      usernameRef.set(userid);

      localStorage.setItem(localUser, JSON.stringify(locUser));

      this.props.history.push("/navigation");
    }



  checkUsername(u){
    // console.log(this.state.username);
    // username = this.state.username.toLowerCase()
    let that = this;
    let username = u
    let usernameAvailable = false;

    let usernameCheck = ref.ref('/usernames/' + u).once('value').then(function(snapshot) {
      // console.log(snapshot.val())
      usernameAvailable = (!snapshot.val())?false:true;
      // return snapshot.val()
      // console.log('username',username,usernameAvailable);
      that.setState({usernameAvailable,username})
    })

    // userRef.set(locUser.gamemath[operator]);
    // return this.db.object(`usernames/${username}`)
  }


  hasUsername(user){
    return user.username ? true : false
  }

  getUsername(){
    return user.username ? true : false
  }

  render() {
    let usernameText = (this.usernameInput)?this.usernameInput.value:''
    let usernameAvailable = true
    let opacity = (!this.state.hidden)?1:0
    let styles = {opacity};

    return (
      <div className="main username">
        <div className="main-fade" style={styles}>
          <div className="wrapper">
              <h1 className="headline">Welcome Traveler!</h1>
              <p className="sub-copy">What shall we call you?</p>
              <p className="instructions">Letters and numbers only.</p>
              <div className="input-field">
              <input
                type="text"
                className="mdl-textfield__input input"
                placeholder="Choose a Username"
                ref={(ref) => (this.usernameInput = ref)}
                onKeyUp={this.handleKeyUp}
              />
              </div>

              <p className={`help ${(!this.state.usernameAvailable)?'is-success':'is-danger'}`} >
                {usernameText} is {(!this.state.usernameAvailable)?'available':'not available'}
              </p>

              <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent"
                   disabled={(this.state.usernameAvailable || !usernameText)}
                   onClick={this.updateUsername}>
                   Select Username
              </button>
          </div>
        </div>
      </div>
    )

    }
}

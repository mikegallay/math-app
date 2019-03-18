/**
 * Login component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';
import { Link } from 'react-router-dom';
import GoogleLogin from 'react-google-login';

import './Login.scss';

import {loginWithGoogle} from "../../services/auth";
import {firebaseAuth,ref} from "../../config/constants";

const firebaseAuthKey = "firebaseAuthInProgress";
const localUser = "localUser";
const appTokenKey = "appToken";

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    let fname = '';
    let userimg = '';
    let greeting = 'Please Log In';
    let onLogin = false;
    let hidden = 'hidden';

    //username option
    let username = '';
    let email = '';
    let passwordOne = '';
    let passwordTwo = '';
    let error = '';

    this.state = {hidden,fname,greeting,onLogin,username, email, passwordOne, passwordTwo, error};

    this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
    this.checkNewUser = this.checkNewUser.bind(this);
    this.hasUsername = this.hasUsername.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.nextStep = this.nextStep.bind(this);



  }

    handleGoogleLogin() {
        loginWithGoogle()
            .catch(function (error) {
                alert(error); // or show toast
                localStorage.removeItem(firebaseAuthKey);
            });
        localStorage.setItem(firebaseAuthKey, "1");
    }

    handleKeyUp(e) {
      console.log('key up');
      console.log(e.target.value);
      let username = e.target.value
      this.setState({username})
    }

    updateUsername() {

    }

    componentWillMount() {
      console.log('componentWillMount');
      firebaseAuth().getRedirectResult().then(function(result) {
       if (result.user) {
       console.log("GoogleLogin Redirect result");
       if (result.credential) {
       // This gives you a Google Access Token. You can use it to access the Google API.
       let token = result.credential.accessToken;
       // ...
       }
       // The signed-in user info.
       let user = result.user;
       console.log("user:", JSON.stringify(user));
       }
       }).catch(function(error) {
       // Handle Errors here.
       var errorCode = error.code;
       var errorMessage = error.message;
       // The email of the user's account used.
       var email = error.email;
       // The firebase.auth.AuthCredential type that was used.
       var credential = error.credential;
       // ...
       alert(error);
       })
      ;

      /**
       * We have appToken relevant for our backend API


      console.log('(appTokenKey)',localStorage.getItem(appTokenKey));
      if (localStorage.getItem(appTokenKey)) {
          this.props.history.push("/navigation");
          return;
      }*/

      firebaseAuth().onAuthStateChanged(user => {
        console.log('onAuthStateChanged');
          if (user) {
              console.log("User signed in: ", JSON.stringify(user));
              console.log('curruser',firebaseAuth().currentUser);
              localStorage.removeItem(firebaseAuthKey);

              // here you could authenticate with you web server to get the
              // application specific token so that you do not have to
              // authenticate with firebase every time a user logs in
              localStorage.setItem(appTokenKey, user.uid);

              // store the token
              var currUser = firebaseAuth().currentUser;
              // console.log('uid',currUser.uid);
              this.checkNewUser(currUser);
              // this.props.history.push("/navigation")
          }
      });
      //hide the layout until the css is loaded
      let hider = setTimeout(() => {
        this.setState({hidden : ""});
    }, 1000)
  }

  /*responseGoogle(response){
    console.log(response.profileObj);
    var profile = response.profileObj;
    console.log('ID: ' + profile.googleId); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.givenName + ' ' + profile.familyName);
    console.log('Image URL: ' + profile.imageUrl);
    console.log('Email: ' + profile.email); // This is null if the 'email' scope is not present.
    this.setState({
      fname:profile.givenName,
      userimg:profile.imageUrl,
      greeting:'Welcome Back',
      onLogin:'logged'
    })

    firebase.auth().currentUser.linkWithRedirect(provider);

    // this.sendToFirebase(profile);
  }*/

  hasUsername(user){
    return user.username ? true : false
  }

  getUsername(){
    return user.username ? true : false
  }

  checkNewUser(currUser){
    console.log('CheckNewUser');
    // const userRef = ref;//firebase.database().ref('user');
    // let newUser = false
    let username = '';
    let that = this;
    let userRef = ref.ref('/users/' + currUser.uid);
    console.log('asdf',userRef);
    let newUserCheck = ref.ref('/users/' + currUser.uid).once('value').then(function(snapshot) {
      // newUser = (snapshot.val()) ? false : true;

      if (!snapshot.val()){
        var uid = currUser.uid;
        var displayName = currUser.displayName;
        var photoURL = currUser.providerData[0].photoURL;

          //create iniital data dump
        console.log('new user. pushing default data.');
        const data = {
          userid: uid,
          username:'',
          fname: displayName,
          userimg: photoURL,
          gamemath:{
            add:{ practice:0, battle:0, unlocked:false },
            sub:{ practice:0, battle:0, unlocked:false },
            mul:{ practice:0, battle:0, unlocked:false },
            div:{ practice:0, battle:0, unlocked:false },
            ran:{ practice:0, battle:0, unlocked:false },
          },
          creatures:{
            add:{c01:false,c02:false,r01:false},
            sub:{c01:false,c02:false,r01:false},
            mul:{c01:false,c02:false,r01:false},
            div:{c01:false,c02:false,r01:false},
            ran:{c01:false,c02:false,r01:false}
          }
        }
        // console.log('userRef',userRef)
        userRef.set(data);
        localStorage.setItem(localUser, JSON.stringify(data));
        that.nextStep(username)

      }else{
        // console.log('user exists',snapshot.val().fname);
        let existingData = snapshot.val();
        // existingData.fname = 'existing user2';
        username = existingData.username;
        console.log('set username',username);
        localStorage.setItem(localUser, JSON.stringify(existingData));
        that.nextStep(username)
        // userRef.set(existingData)
        // var lu = JSON.parse(localStorage.getItem(localUser));
        // console.log('lu',lu.userimg);
        // console.log('ed',existingData.userimg);

      }

    })

  }

  nextStep(username){
    // this.setState({onLogin:true});
    console.log('new username',username);
    if (username != '') {
      this.props.history.push("/navigation");
    }else{
      this.props.history.push("/chooseusername");
    }
  }

  render() {
    console.log(firebaseAuthKey + "=" + localStorage.getItem(firebaseAuthKey));
    if (localStorage.getItem(firebaseAuthKey) === "1") return <SplashScreen state={this.state}/>;
    return <LoginPage handleGoogleLogin={this.handleGoogleLogin} state={this.state} />;

    }
}


const LoginPage = ({handleGoogleLogin,state}) => (
    <div className={state.hidden}>
        <h1>Login</h1>
        <div>
            <h2>Sign in with Google</h2>
            <button
                value="Sign in with Google"
                onClick={handleGoogleLogin}
            >Sign in</button>
        </div>
        <div className="not-google">
        <h2>Sign in with Username</h2>
        <form onSubmit={this.onSubmit}>
            <input
              name="username"
              value={state.username}
              onChange={this.onChange}
              type="text"
              placeholder="Username"
            />
            <input
              name="email"
              value={state.email}
              onChange={this.onChange}
              type="text"
              placeholder="Email Address"
            />
            <input
              name="passwordOne"
              value={state.passwordOne}
              onChange={this.onChange}
              type="password"
              placeholder="Password"
            />
            <input
              name="passwordTwo"
              value={state.passwordTwo}
              onChange={this.onChange}
              type="password"
              placeholder="Confirm Password"
            />
            <button type="submit">Sign Up</button>

            {state.error && <p>{state.error.message}</p>}
          </form>
        </div>
    </div>
);

const SplashScreen = ({state}) => (
    <div className={state.hidden}>
        <h1>Loading...</h1>
    </div>
);

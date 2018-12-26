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
    let onLogin = ''
    this.state = {fname,greeting,onLogin};

    this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
    this.checkNewUser = this.checkNewUser.bind(this);
  }

    handleGoogleLogin() {
        loginWithGoogle()
            .catch(function (error) {
                alert(error); // or show toast
                localStorage.removeItem(firebaseAuthKey);
            });
        localStorage.setItem(firebaseAuthKey, "1");
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

  checkNewUser(currUser){
    // const userRef = ref;//firebase.database().ref('user');
    // let newUser = false
    let userRef = ref.ref('/users/' + currUser.uid);
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
          fname: displayName,
          userimg: photoURL,
          game:{
            add:{ hiscore:0, unlocked:false },
            sub:{ hiscore:0, unlocked:false },
            mul:{ hiscore:0, unlocked:true },
            div:{ hiscore:0, unlocked:false },
            ran:{ hiscore:0, unlocked:false },
          },
          monsters:{
            level01:{m01:false,m02:false,m03:false}
          }
        }
        // console.log('userRef',userRef)
        userRef.set(data);
      }else{
        // console.log('user exists',snapshot.val().fname);
        let existingData = snapshot.val();
        // existingData.fname = 'existing user2';
        localStorage.setItem(localUser, JSON.stringify(existingData));
        // userRef.set(existingData)
        // var lu = JSON.parse(localStorage.getItem(localUser));
        // console.log('lu',lu.userimg);
        // console.log('ed',existingData.userimg);
      }

    })
    this.props.history.push("/navigation")
  }

  render() {
        console.log(firebaseAuthKey + "=" + localStorage.getItem(firebaseAuthKey));
        if (localStorage.getItem(firebaseAuthKey) === "1") return <SplashScreen/>;
        return <LoginPage handleGoogleLogin={this.handleGoogleLogin}/>;
    }
}


const LoginPage = ({handleGoogleLogin}) => (
    <div>
        <h1>Login</h1>
        <div>
            <button
                value="Sign in with Google"
                onClick={handleGoogleLogin}
            >Sign in with Google</button>
        </div>
    </div>
);

const SplashScreen = () => (
    <div>
        <h1>Loading...</h1>
    </div>
);

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
import {firebaseAuth} from "../../config/constants";

const firebaseAuthKey = "firebaseAuthInProgress";
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
    this.sendToFirebase = this.sendToFirebase.bind(this);
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
       */

       console.log('(appTokenKey)',localStorage.getItem(appTokenKey));
      if (localStorage.getItem(appTokenKey)) {
          this.props.history.push("/navigation");
          return;
      }

      firebaseAuth().onAuthStateChanged(user => {
        console.log('onAuthStateChanged');
          if (user) {
              console.log("User signed in: ", JSON.stringify(user));

              localStorage.removeItem(firebaseAuthKey);

              // here you could authenticate with you web server to get the
              // application specific token so that you do not have to
              // authenticate with firebase every time a user logs in
              localStorage.setItem(appTokenKey, user.uid);

              // store the token
              this.props.history.push("/navigation")
          }
      });
  }

  responseGoogle(response){
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
  }

  sendToFirebase(profile){
    const userRef = firebase.database().ref('user');
    const user = {
      fname: this.state.fname,
      userimg: this.state.userimg,
      data:{
        add:{
          hiscore:0,
          unlocked:false
        }
      },
      monsters:{
        level01:{m01:false,m02:false,m03:false}
      }
    }
    userRef.push(user);
    this.setState({
      fname: '',
      userimg: '',

    });
  }

  /*render(){
    return (
      <main className="page-login">
        <h1>Math 60</h1>
        <h3>{this.state.greeting} {this.state.fname}!</h3>
        <div><img src={this.state.userimg}/></div>
        <div className={`google-signin ${this.state.onLogin}`}>
          <GoogleLogin
            clientId="44464936686-0iltkf2fc4926stprg6c46te9mcopd67.apps.googleusercontent.com"
            render={renderProps => (
              <button className={this.state.onLogin} onClick={renderProps.onClick}>LOGIN</button>
            )}
            buttonText="Login"
            onSuccess={(e)=>this.responseGoogle(e)}
            onFailure={(e)=>this.responseGoogle(e)}
          />
        </div>
        <Link to="/navigation/">Navigation</Link>
        <p className="credit">© 2018 Mike Gallay</p>

      </main>
    );
  }*/
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

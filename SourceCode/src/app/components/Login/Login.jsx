/**
 * Login component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';
import { Link } from 'react-router-dom';
import GoogleLogin from 'react-google-login';

import './Login.scss';

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    let fname = '';
    let userimg = '';
    let greeting = 'Please Log In';
    let onLogin = ''
    this.state = {fname,greeting,onLogin};
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
  }

  render(){
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
  }
}

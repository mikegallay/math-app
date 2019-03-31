/**
 * Stats component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';
import { Link } from 'react-router-dom';
import {logout} from "../../services/auth";

import './Store.scss';
import SecondaryNav from '../SecondaryNav/SecondaryNav';

const localUser = "localUser";
const appTokenKey = "appToken";

export default class Store extends React.Component {
  constructor(props) {
    super(props);
    let hidden = true;
    this.state = {hidden};

    //check current high score
    // localStorage.setItem(localUser, JSON.stringify(existingData));
    // var locUser = JSON.parse(localStorage.getItem(localUser));
    // console.log('main',locUser, (locUser));


  }

  componentWillMount(){
    //hide the layout until the css is loaded
    let hider = setTimeout(() => {
      let hidden = false
      this.setState({hidden});
    }, 1000)
  }

  render() {
    var locUser = JSON.parse(localStorage.getItem(localUser));
    var gems = locUser.gems;

    let opacity = (!this.state.hidden)?1:0
    let styles = {opacity};

    return (
      <div className="store main">
        <div className="main-fade" style={styles}>
          <div className="wrapper">
            <h1>Store</h1>
            <SecondaryNav currpage="store"/>
            <div className="gems">Total Gems: {gems}</div>
          </div>
        </div>
      </div>
    );
  }
}

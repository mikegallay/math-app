/**
 * Stats component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';
import { Link } from 'react-router-dom';
import {logout} from "../../services/auth";
import {firebaseAuth,ref} from "../../config/constants";

import './Store.scss';
import SecondaryNav from '../SecondaryNav/SecondaryNav';

const localUser = "localUser";
const appTokenKey = "appToken";


export default class Store extends React.Component {
  constructor(props) {
    super(props);
    let hidden = true;
    var locUser = JSON.parse(localStorage.getItem(localUser));
    let staff = locUser.staffs.current;
    this.state = {hidden,staff,locUser};

    this.selectStaff = this.selectStaff.bind(this)
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

  selectStaff(st){
    let staff = st;
    this.setState({staff});

    //save to localstorage
    // var locUser = JSON.parse(localStorage.getItem(localUser));
    var locUser = this.state.locUser;
    locUser.staffs.current = staff
    localStorage.setItem(localUser, JSON.stringify(locUser));

    //sync to firebase
    let userRef = ref.ref('/users/' + locUser.userid + '/staffs/current');
    userRef.set(locUser.staffs.current);

  }

  render() {
    var locUser = this.state.locUser;///JSON.parse(localStorage.getItem(localUser));
    var currentStaff = locUser.staffs.current;
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
            <div className="staffs">
              <ul>
                <li onClick={() => this.selectStaff('default')} className={`staff default purchased ${(this.state.staff=='default')?'selected':''}`}>Default</li>
                <li onClick={() => this.selectStaff('fire')} className={`staff fire purchased ${(this.state.staff=='fire')?'selected':''}`}>Fire</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

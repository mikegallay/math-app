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
const prices = {forest:50,rock:100,water:200,fire:250};


export default class Store extends React.Component {
  constructor(props) {
    super(props);
    let hidden = true;

    var locUser = JSON.parse(localStorage.getItem(localUser));
    let forestpurchased = locUser.staffs.forest.purchased;
    let rockpurchased = locUser.staffs.rock.purchased;
    let waterpurchased = locUser.staffs.water.purchased;
    let firepurchased = locUser.staffs.fire.purchased;
    let staff = locUser.staffs.current;
    let gems = locUser.gems;
    this.state = {hidden,staff,locUser,gems,forestpurchased,rockpurchased,waterpurchased,firepurchased};

    this.selectStaff = this.selectStaff.bind(this)
    this.buyStaff = this.buyStaff.bind(this)
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
    console.log('select',this.state[staff + 'purchased']);

    if (this.state[staff + 'purchased']){

      this.setState({staff});
      //save to localstorage
      var locUser = this.state.locUser;
      locUser.staffs.current = staff
      localStorage.setItem(localUser, JSON.stringify(locUser));

      //sync to firebase
      let userRef = ref.ref('/users/' + locUser.userid + '/staffs/current');
      userRef.set(locUser.staffs.current);
    }


  }

  buyStaff(st) {
    let staff = st;
    let cost = prices[staff];
    let gems = this.state.gems;
    let canBuy = (gems >= cost)?true:false;

    // console.log(st,cost,this.state.gems);
    if (canBuy){
      //save to localstorage
      gems -= cost;
      var locUser = this.state.locUser;
      locUser.staffs[staff].purchased = true;
      locUser.gems = gems;
      localStorage.setItem(localUser, JSON.stringify(locUser));

      //sync to firebase
      let purchRef = ref.ref('/users/' + locUser.userid + '/staffs/' + staff + '/purchased');
      purchRef.set(locUser.staffs[staff].purchased);
      let gemRef = ref.ref('/users/' + locUser.userid + '/gems');
      gemRef.set(locUser.gems);

      this.setState({[staff + "purchased"]:true,gems})
    }
  }

  render() {
    var locUser = this.state.locUser;///JSON.parse(localStorage.getItem(localUser));
    var locStaff = locUser.staffs;
    var currentStaff = locUser.staffs.current;
    // var gems = locUser.gems;

    let opacity = (!this.state.hidden)?1:0
    let styles = {opacity};

    return (
      <div className="store main">
        <div className="main-fade" style={styles}>
          <div className="wrapper">
            <h1>Store</h1>
            <SecondaryNav currpage="store"/>
            <p className="subhead">It is always a good idea to upgrade your staff. Unlock the staffs by completing Level 1 in each kingdom and buy them with the gems you earn by training.</p>
            <div className="gems luckiest-guy">You have <span className="gem-count">{this.state.gems} gems</span></div>
            <div className="staffs">
              <ul>
                <li onClick={() => this.selectStaff('default')} className={`staff default purchased ${(this.state.staff=='default')?'selected':''}`}>
                  <div className="staff-art">Default</div>
                  <div className="staff-name luckiest-guy">Default</div>
                  <p>A sturdy staff. Great for beginners.</p>
                </li>

                <li onClick={() => this.selectStaff('forest')} className={`staff forest ${(locStaff.forest.ready)?'available':'notyet'}
                ${(this.state.forestpurchased)?'purchased':''} ${(this.state.staff=='forest')?'selected':''}`}>
                  <div className="staff-art">Forest</div>
                  <div className="staff-name luckiest-guy">Forest</div>
                  <p>Behold the power of the trees!</p>
                  <button
                      className="buy-btn mdl-button mdl-js-button mdl-button--raised mdl-button--accent"
                      value="Buy Now"
                      onClick={(e) => {e.stopPropagation(); this.buyStaff('forest')}}
                  >{prices['forest']} Gems</button>
                </li>
                <li onClick={() => this.selectStaff('rock')} className={`staff rock ${(locStaff.rock.ready)?'available':'notyet'}
                ${(this.state.rockpurchased)?'purchased':''} ${(this.state.staff=='rock')?'selected':''}`}>
                  <div className="staff-art">Rock</div>
                  <div className="staff-name luckiest-guy">Rock</div>
                  <p>Math is hard, but rocks are harder</p>
                  <button
                      className="buy-btn mdl-button mdl-js-button mdl-button--raised mdl-button--accent"
                      value="Buy Now"
                      onClick={(e) => {e.stopPropagation(); this.buyStaff('rock')}}
                  >{prices['rock']} Gems</button>
                </li>
                <li onClick={() => this.selectStaff('water')} className={`staff water ${(locStaff.water.ready)?'available':'notyet'}
                ${(this.state.waterpurchased)?'purchased':''} ${(this.state.staff=='water')?'selected':''}`}>
                  <div className="staff-art">Water</div>
                  <div className="staff-name luckiest-guy">Water</div>
                  <p>Jump right in, the water is fine</p>
                  <button
                      className="buy-btn mdl-button mdl-js-button mdl-button--raised mdl-button--accent"
                      value="Buy Now"
                      onClick={(e) => {e.stopPropagation(); this.buyStaff('water')}}
                  >{prices['water']} Gems</button>
                </li>
                <li onClick={() => this.selectStaff('fire')} className={`staff fire ${(locStaff.fire.ready)?'available':'notyet'}
                ${(this.state.firepurchased)?'purchased':''} ${(this.state.staff=='fire')?'selected':''}`}>
                  <div className="staff-art">Fire</div>
                  <div className="staff-name luckiest-guy">Fire</div>
                  <p>Adds a small about of heat damage on some attacks.</p>
                  <button
                      className="buy-btn mdl-button mdl-js-button mdl-button--raised mdl-button--accent"
                      value="Buy Now"
                      onClick={(e) => {e.stopPropagation(); this.buyStaff('fire')}}
                  >{prices['fire']} Gems</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

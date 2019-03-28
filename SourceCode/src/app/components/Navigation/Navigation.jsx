/**
 * Navigation component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';
import { Link } from 'react-router-dom';
import {logout} from "../../services/auth";
import {firebaseAuth,ref} from "../../config/constants";

import './Navigation.scss';
import stopwatch from '../../images/stopwatch.png';
import heart from '../../images/heart.png';

import Modal from '../Modal/Modal';

const appTokenKey = "appToken";
const localUser = "localUser";

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);

    //check current high score
    // localStorage.setItem(localUser, JSON.stringify(existingData));
    var locUser = JSON.parse(localStorage.getItem(localUser));
    // console.log('main',locUser, (locUser));
    // console.log('lu',lu);
    var addUnlocked1 = (locUser) ? locUser.gamemath.add.unlocked1 : false;
    var subUnlocked1 = (locUser) ? locUser.gamemath.sub.unlocked1 : false;
    var mulUnlocked1 = (locUser) ? locUser.gamemath.mul.unlocked1 : false;
    var divUnlocked1 = (locUser) ? locUser.gamemath.div.unlocked1 : false;
    var ranUnlocked1 = (locUser) ? locUser.gamemath.ran.unlocked : false;

    var addUnlocked2 = (locUser) ? locUser.gamemath.add.unlocked2 : false;
    var subUnlocked2 = (locUser) ? locUser.gamemath.sub.unlocked2 : false;
    var mulUnlocked2 = (locUser) ? locUser.gamemath.mul.unlocked2 : false;
    var divUnlocked2 = (locUser) ? locUser.gamemath.div.unlocked2 : false;
    // var ranUnlocked2 = (locUser) ? locUser.gamemath.ran.unlocked2 : false;

    let username = locUser.username
    let hidden = true

    this.state = {modalVisible:'init false',hidden,addUnlocked1,subUnlocked1,mulUnlocked1,divUnlocked1,ranUnlocked1,addUnlocked2,subUnlocked2,mulUnlocked2,divUnlocked2,username};
    this.handleLogout = this.handleLogout.bind(this);
    // console.log("User:", this.state.firebaseUser,localStorage.getItem("appToken"));
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

  closeModal(){
    this.setState({
      modalVisible:false
    })
  }

  openModal(){
    // console.log('open modal');
    this.setState({
      modalVisible:true
    })
  }

  render() {
    let opacity = (!this.state.hidden)?1:0
    let styles = {opacity};

    let howToBody = '<p>Use this app daily to improve your math skills. You can choose addition, subtraction, multiplication, division or randomize the skill</p><p>There are two icons next to each of the math skills.</p><p><img className="legend" src='+heart+' width="25" height="25"/><br/>Choose the heart and play until you make 3 mistakes.</p><p><img className="legend" src='+stopwatch+' width="25" height="25"/><br/>Choose the clock and answer as many as you can in 60 seconds.</p><p>The more answers you get correct in a row, the higher your score multiplier. Wrong answers will lower your overall accuracy. Good luck!!</p>'
    return (
      <div className="main navigation">
        <div className="main-fade" style={styles}>
          <div className="wrapper">
            <div className="legend-of">
              <p className="luckiest-guy">The Legend of</p>
              <h1 className="username">{this.state.username}</h1>
            </div>
            <a className="how-to-play" onClick={()=>{this.openModal()}}> How to Play </a>
            <Link to='/statistics' className='stats-btn'> View Statistics </Link>
            <div className="main-menu">
              <div className="menu-btns">
                <Link className="health-btn" to={{ pathname: '/math', state: { operator: 'add', gamemode:'health', level:0} }}>
                  <img src={heart} width="25" height="25"/>
                </Link>
                <span className="menu-name">ADDITION</span>
                <Link className={`stopwatch-btn ${(this.state.addUnlocked1)?'':'inactive'}`} to={{ pathname: '/math', state: { operator: 'add', gamemode:'countdown', level:1} }}>
                  <img src={stopwatch} width="25" height="25"/>
                </Link>
                <Link className={`stopwatch-btn ${(this.state.addUnlocked2)?'':'inactive'}`} to={{ pathname: '/math', state: { operator: 'add', gamemode:'countdown', level:2} }}>
                  <img src={stopwatch} width="25" height="25"/>
                </Link>
              </div>

              <div className="menu-btns">
                <Link className="health-btn" to={{ pathname: '/math', state: { operator: 'sub', gamemode:'health', level:0} }}>
                  <img src={heart} width="25" height="25"/>
                </Link>
                <span className="menu-name">SUBTRACTION</span>
                <Link className={`stopwatch-btn ${(this.state.subUnlocked1)?'':'inactive'}`} to={{ pathname: '/math', state: { operator: 'sub', gamemode:'countdown', level:1} }}>
                  <img src={stopwatch} width="25" height="25"/>
                </Link>
                <Link className={`stopwatch-btn ${(this.state.subUnlocked2)?'':'inactive'}`} to={{ pathname: '/math', state: { operator: 'sub', gamemode:'countdown', level:2} }}>
                  <img src={stopwatch} width="25" height="25"/>
                </Link>
              </div>

              <div className="menu-btns">
                <Link className="health-btn" to={{ pathname: '/math', state: { operator: 'mul', gamemode:'health', level:0} }}>
                  <img src={heart} width="25" height="25"/>
                </Link>
                <span className="menu-name">MULTIPLICATION</span>
                <Link className={`stopwatch-btn ${(this.state.mulUnlocked1)?'':'inactive'}`} to={{ pathname: '/math', state: { operator: 'mul', gamemode:'countdown', level:1} }}>
                  <img src={stopwatch} width="25" height="25"/>
                </Link>
                <Link className={`stopwatch-btn ${(this.state.mulUnlocked2)?'':'inactive'}`} to={{ pathname: '/math', state: { operator: 'mul', gamemode:'countdown', level:2} }}>
                  <img src={stopwatch} width="25" height="25"/>
                </Link>
              </div>

              <div className="menu-btns">
                <Link className="health-btn" to={{ pathname: '/math', state: { operator: 'div', gamemode:'health', level:0} }}>
                  <img src={heart} width="25" height="25"/>
                </Link>
                <span className="menu-name">DIVISION</span>
                <Link className={`stopwatch-btn ${(this.state.divUnlocked1)?'':'inactive'}`} to={{ pathname: '/math', state: { operator: 'div', gamemode:'countdown', level:1} }}>
                  <img src={stopwatch} width="25" height="25"/>
                </Link>
                <Link className={`stopwatch-btn ${(this.state.divUnlocked2)?'':'inactive'}`} to={{ pathname: '/math', state: { operator: 'div', gamemode:'countdown', level:2} }}>
                  <img src={stopwatch} width="25" height="25"/>
                </Link>
              </div>

              <div className="menu-btns">
                <Link className="health-btn" to={{ pathname: '/math', state: { operator: 'add', gamemode:'health', randomize:true} }}>
                  <img src={heart} width="25" height="25"/>
                </Link>
                <span className="menu-name">RANDOMIZE ALL</span>
                <Link className={`stopwatch-btn ${(this.state.ranUnlocked1)?'':'inactive'}`} to={{ pathname: '/math', state: { operator: 'div', gamemode:'countdown'} }}>
                  <img src={stopwatch} width="25" height="25"/>
                </Link>
              </div>
            </div>

            <div>
                <button
                    value="Sign Out"
                    className="mdl-button"
                    onClick={this.handleLogout}
                >Sign Out</button>
            </div>

            <p className="credit">© 2018 Mike Gallay</p>

            <Modal
              title="How To Play"
              body={howToBody}
              score=""
              gameplayBtns={false}
              visible={this.state.modalVisible}
              closeModal={()=>{this.closeModal()}}
            />

          </div>
        </div>
      </div>
    );
  }
}

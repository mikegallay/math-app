/**
 * Navigation component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';
import { Link } from 'react-router-dom';
// import {logout} from "../../services/auth";
import {firebaseAuth,ref,hideTimer} from "../../config/constants";

import './Navigation.scss';
import stopwatch from '../../images/stopwatch.png';
import heart from '../../images/heart.png';

import Modal from '../Modal/Modal';
import SecondaryNav from '../SecondaryNav/SecondaryNav';

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

    var revealed = (locUser) ? locUser.gamemath.ran.revealed : false;
    var fbunlocked = (locUser) ? locUser.gamemath.ran.unlocked : false;
    // var ranUnlocked2 = (locUser) ? locUser.gamemath.ran.unlocked2 : false;

    var tutTraining = (!locUser.tutorials.training) ? 'training' : '';
    var tutBattle = (!locUser.tutorials.battle) ? 'battle' : '';

    console.log('tut',locUser.tutorials.battle,locUser.tutorials.training);

    let username = locUser.username
    let hidden = true

    this.state = {modalVisible:'init false',revealed,fbunlocked,hidden,addUnlocked1,subUnlocked1,mulUnlocked1,divUnlocked1,ranUnlocked1,addUnlocked2,subUnlocked2,mulUnlocked2,divUnlocked2,username,tutTraining,tutBattle};
    // this.handleLogout = this.handleLogout.bind(this);
    // console.log("User:", this.state.firebaseUser,localStorage.getItem("appToken"));
  }
  componentWillMount(){
    //hide the layout until the css is loaded
    let hider = setTimeout(() => {
      let hidden = false
      this.setState({hidden});
    }, hideTimer)
  }

  /*handleLogout() {
    // console.log('handleLogout');
     logout().then(function () {
         localStorage.removeItem(appTokenKey);
         this.props.history.push("/login");
         // console.log(this.props.history);
         console.log("user signed out from firebase");
     }.bind(this));
   }*/

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
    let tutT = this.state.tutTraining;
    let tutB = this.state.tutBattle;

    let fbReveal = (!this.state.revealed && this.state.fbunlocked)?'fb-reveal':'';

    let howToBody = '<p>Use this app daily to improve your math skills. You can choose addition, subtraction, multiplication, division or randomize the skill</p><p>There are two icons next to each of the math skills.</p><p><img className="legend" src='+heart+' width="25" height="25"/><br/>Choose the heart and play until you make 3 mistakes.</p><p><img className="legend" src='+stopwatch+' width="25" height="25"/><br/>Choose the clock and answer as many as you can in 60 seconds.</p><p>The more answers you get correct in a row, the higher your score multiplier. Wrong answers will lower your overall accuracy. Good luck!!</p>'

    return (
      <div className={`main navigation ${fbReveal}`}>
        <div className="main-fade" style={styles}>
          <div className="wrapper">
            <div className="legend-of">
              <p className="luckiest-guy">The Legend of</p>
              <h1 className="username">{this.state.username}</h1>
            </div>
            <SecondaryNav currpage="navigation"/>
            {/*<div>
            <a className="how-to-play" onClick={()=>{this.openModal()}}> How to Play </a>
            <Link to='/statistics' className='stats-btn'> View Statistics </Link>
            </div>*/}

            <div className="main-menu">
              <div className="nav-section add">
                <div className="luckiest-guy banner"><span>+</span></div>
                <Link className="luckiest-guy training" to={{ pathname: '/math', state: { operator: 'add', gamemode:'training', level:0, tutorial:tutT} }}><span>T</span></Link>
                <Link className={`luckiest-guy level1 ${(this.state.addUnlocked1)?'':'inactive'}`} to={{ pathname: '/math', state: { operator: 'add', gamemode:'battle', level:1, tutorial:tutB} }}><span>L1</span></Link>
                <Link className={`luckiest-guy level2 ${(this.state.addUnlocked2)?'':'inactive'}`} to={{ pathname: '/math', state: { operator: 'add', gamemode:'battle', level:2} }}><span>L2</span></Link>
              </div>
              <div className="nav-section sub">
                <div className="luckiest-guy banner"><span>-</span></div>
                <Link className="luckiest-guy training" to={{ pathname: '/math', state: { operator: 'sub', gamemode:'training', level:0, tutorial:tutT} }}><span>T</span></Link>
                <Link className={`luckiest-guy level1 ${(this.state.subUnlocked1)?'':'inactive'}`} to={{ pathname: '/math', state: { operator: 'sub', gamemode:'battle', level:1, tutorial:tutB} }}><span>L1</span></Link>
                <Link className={`luckiest-guy level2 ${(this.state.subUnlocked2)?'':'inactive'}`} to={{ pathname: '/math', state: { operator: 'sub', gamemode:'battle', level:2} }}><span>L2</span></Link>
              </div>
              <div className="nav-section mul">
                <div className="luckiest-guy banner"><span>x</span></div>
                <Link className="luckiest-guy training" to={{ pathname: '/math', state: { operator: 'mul', gamemode:'training', level:0, tutorial:tutT} }}><span>T</span></Link>
                <Link className={`luckiest-guy level1 ${(this.state.mulUnlocked1)?'':'inactive'}`} to={{ pathname: '/math', state: { operator: 'mul', gamemode:'battle', level:1, tutorial:tutB} }}><span>L1</span></Link>
                <Link className={`luckiest-guy level2 ${(this.state.mulUnlocked2)?'':'inactive'}`} to={{ pathname: '/math', state: { operator: 'mul', gamemode:'battle', level:2} }}><span>L2</span></Link>
              </div>
              <div className="nav-section div">
                <div className="luckiest-guy banner"><span>÷</span></div>
                <Link className="luckiest-guy training" to={{ pathname: '/math', state: { operator: 'div', gamemode:'training', level:0, tutorial:tutT} }}><span>T</span></Link>
                <Link className={`luckiest-guy level1 ${(this.state.divUnlocked1)?'':'inactive'}`} to={{ pathname: '/math', state: { operator: 'div', gamemode:'battle', level:1, tutorial:tutB} }}><span>L1</span></Link>
                <Link className={`luckiest-guy level2 ${(this.state.divUnlocked2)?'':'inactive'}`} to={{ pathname: '/math', state: { operator: 'div', gamemode:'battle', level:2} }}><span>L2</span></Link>
              </div>
              <div className={`final-battle ${(this.state.revealed && this.state.fbunlocked)?'fb-ready':'fb-hide'}`}>
                <Link className={`luckiest-guy level3 ${(this.state.ranUnlocked1)?'':'inactive'}`} to={{ pathname: '/math', state: { operator: 'div', gamemode:'battle', level:3, randomize: true} }}><span>FB</span></Link>
              </div>
            </div>

            {/*<<div className="main-menu">
              <div className="menu-btns">
                <Link className="health-btn" to={{ pathname: '/math', state: { operator: 'add', gamemode:'training', level:0} }}>
                  <img src={heart} width="25" height="25"/>
                </Link>
                <span className="menu-name">ADDITION</span>
                <Link className={`stopwatch-btn ${(this.state.addUnlocked1)?'':'inactive'}`} to={{ pathname: '/math', state: { operator: 'add', gamemode:'battle', level:1} }}>
                  <img src={stopwatch} width="25" height="25"/>
                </Link>
                <Link className={`stopwatch-btn ${(this.state.addUnlocked2)?'':'inactive'}`} to={{ pathname: '/math', state: { operator: 'add', gamemode:'battle', level:2} }}>
                  <img src={stopwatch} width="25" height="25"/>
                </Link>
              </div>

              <div className="menu-btns">
                <Link className="health-btn" to={{ pathname: '/math', state: { operator: 'sub', gamemode:'training', level:0} }}>
                  <img src={heart} width="25" height="25"/>
                </Link>
                <span className="menu-name">SUBTRACTION</span>
                <Link className={`stopwatch-btn ${(this.state.subUnlocked1)?'':'inactive'}`} to={{ pathname: '/math', state: { operator: 'sub', gamemode:'battle', level:1} }}>
                  <img src={stopwatch} width="25" height="25"/>
                </Link>
                <Link className={`stopwatch-btn ${(this.state.subUnlocked2)?'':'inactive'}`} to={{ pathname: '/math', state: { operator: 'sub', gamemode:'battle', level:2} }}>
                  <img src={stopwatch} width="25" height="25"/>
                </Link>
              </div>

              <div className="menu-btns">
                <Link className="health-btn" to={{ pathname: '/math', state: { operator: 'mul', gamemode:'training', level:0} }}>
                  <img src={heart} width="25" height="25"/>
                </Link>
                <span className="menu-name">MULTIPLICATION</span>
                <Link className={`stopwatch-btn ${(this.state.mulUnlocked1)?'':'inactive'}`} to={{ pathname: '/math', state: { operator: 'mul', gamemode:'battle', level:1} }}>
                  <img src={stopwatch} width="25" height="25"/>
                </Link>
                <Link className={`stopwatch-btn ${(this.state.mulUnlocked2)?'':'inactive'}`} to={{ pathname: '/math', state: { operator: 'mul', gamemode:'battle', level:2} }}>
                  <img src={stopwatch} width="25" height="25"/>
                </Link>
              </div>

              <div className="menu-btns">
                <Link className="health-btn" to={{ pathname: '/math', state: { operator: 'div', gamemode:'training', level:0} }}>
                  <img src={heart} width="25" height="25"/>
                </Link>
                <span className="menu-name">DIVISION</span>
                <Link className={`stopwatch-btn ${(this.state.divUnlocked1)?'':'inactive'}`} to={{ pathname: '/math', state: { operator: 'div', gamemode:'battle', level:1} }}>
                  <img src={stopwatch} width="25" height="25"/>
                </Link>
                <Link className={`stopwatch-btn ${(this.state.divUnlocked2)?'':'inactive'}`} to={{ pathname: '/math', state: { operator: 'div', gamemode:'battle', level:2} }}>
                  <img src={stopwatch} width="25" height="25"/>
                </Link>
              </div>

              <div className="menu-btns">
                <Link className="health-btn" to={{ pathname: '/math', state: { operator: 'add', gamemode:'training', randomize:true} }}>
                  <img src={heart} width="25" height="25"/>
                </Link>
                <span className="menu-name">RANDOMIZE ALL</span>
                <Link className={`stopwatch-btn ${(this.state.ranUnlocked1)?'':'inactive'}`} to={{ pathname: '/math', state: { operator: 'div', gamemode:'battle'} }}>
                  <img src={stopwatch} width="25" height="25"/>
                </Link>
              </div>
            </div>*/}

            <p className="credit">© 2020 Michael Gallay</p>



            {/*<Modal
              title="How To Play"
              body={howToBody}
              score=""
              gameplayBtns={false}
              visible={this.state.modalVisible}
              closeModal={()=>{this.closeModal()}}
            />*/}

          </div>
        </div>
      </div>
    );
  }
}

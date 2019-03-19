/**
 * Main component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';
import { Link } from 'react-router-dom';
import {logout} from "../../services/auth";
import {firebaseAuth,ref} from "../../config/constants";

import './Main.scss';
import stopwatch from '../../images/stopwatch.png';
import heart from '../../images/heart.png';

import Modal from '../Modal/Modal';

const appTokenKey = "appToken";
const localUser = "localUser";

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    //check current high score
    // localStorage.setItem(localUser, JSON.stringify(existingData));
    var locUser = JSON.parse(localStorage.getItem(localUser));
    console.log('main',locUser, (locUser));
    // console.log('lu',lu);
    var addBonus = (locUser) ? locUser.gamemath.add.unlocked : false;
    var subBonus = (locUser) ? locUser.gamemath.sub.unlocked : false;
    var mulBonus = (locUser) ? locUser.gamemath.mul.unlocked : false;
    var divBonus = (locUser) ? locUser.gamemath.div.unlocked : false;
    var ranBonus = (locUser) ? locUser.gamemath.ran.unlocked : false;

    let username = locUser.username
    let hidden = true

    console.log('asdfasdf',addBonus);
    this.state = {modalVisible:'init false',hidden,addBonus,subBonus,mulBonus,divBonus,ranBonus,username};
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
    let display = (!this.state.hidden)?'block':'none'
    let styles = {display};

    let howToBody = '<p>Use this app daily to improve your math skills. You can choose addition, subtraction, multiplication, division or randomize the skill</p><p>There are two icons next to each of the math skills.</p><p><img className="legend" src='+heart+' width="25" height="25"/><br/>Choose the heart and play until you make 3 mistakes.</p><p><img className="legend" src='+stopwatch+' width="25" height="25"/><br/>Choose the clock and answer as many as you can in 60 seconds.</p><p>The more answers you get correct in a row, the higher your score multiplier. Wrong answers will lower your overall accuracy. Good luck!!</p>'
    return (
      <main style={styles} className="page-main">
        <h1>Math 60</h1>

        -<a className="how-to-play" onClick={()=>{this.openModal()}}> How to Play </a>-
        <Link to='/statistics' className='stats-btn'> View Statistics </Link>-
        <h3>Hi <span className="username">{this.state.username}</span>!</h3>
        <div className="main-menu">
          <div className="menu-btns">
            <Link className="health-btn" to={{ pathname: '/math', state: { operator: 'add', gamemode:'health'} }}>
              <img src={heart} width="25" height="25"/>
            </Link>
            <span className="menu-name">ADDITION</span>
            <Link className={`stopwatch-btn ${(this.state.addBonus)?'':'inactive'}`} to={{ pathname: '/math', state: { operator: 'add', gamemode:'countdown'} }}>
              <img src={stopwatch} width="25" height="25"/>
            </Link>
          </div>

          <div className="menu-btns">
            <Link className="health-btn" to={{ pathname: '/math', state: { operator: 'sub', gamemode:'health'} }}>
              <img src={heart} width="25" height="25"/>
            </Link>
            <span className="menu-name">SUBTRACTION</span>
            <Link className={`stopwatch-btn ${(this.state.subBonus)?'':'inactive'}`} to={{ pathname: '/math', state: { operator: 'sub', gamemode:'countdown'} }}>
              <img src={stopwatch} width="25" height="25"/>
            </Link>
          </div>

          <div className="menu-btns">
            <Link className="health-btn" to={{ pathname: '/math', state: { operator: 'mul', gamemode:'health'} }}>
              <img src={heart} width="25" height="25"/>
            </Link>
            <span className="menu-name">MULTIPLICATION</span>
            <Link className={`stopwatch-btn ${(this.state.mulBonus)?'':'inactive'}`} to={{ pathname: '/math', state: { operator: 'mul', gamemode:'countdown'} }}>
              <img src={stopwatch} width="25" height="25"/>
            </Link>
          </div>

          <div className="menu-btns">
            <Link className="health-btn" to={{ pathname: '/math', state: { operator: 'div', gamemode:'health'} }}>
              <img src={heart} width="25" height="25"/>
            </Link>
            <span className="menu-name">DIVISION</span>
            <Link className={`stopwatch-btn ${(this.state.divBonus)?'':'inactive'}`} to={{ pathname: '/math', state: { operator: 'div', gamemode:'countdown'} }}>
              <img src={stopwatch} width="25" height="25"/>
            </Link>
          </div>

          <div className="menu-btns">
            <Link className="health-btn" to={{ pathname: '/math', state: { operator: 'add', gamemode:'health', randomize:true} }}>
              <img src={heart} width="25" height="25"/>
            </Link>
            <span className="menu-name">RANDOMIZE ALL</span>
            <Link className={`stopwatch-btn ${(this.state.ranBonus)?'':'inactive'}`} to={{ pathname: '/math', state: { operator: 'add', gamemode:'countdown', randomize:true} }}>
              <img src={stopwatch} width="25" height="25"/>
            </Link>
          </div>


          {/* <p className="instructions section"><strong>Times Tables</strong></p>
          <div className="menu-btns times-table">
            <Link className="health-btn" to={{ pathname: '/math', state: { operator: 'mul', gamemode:'health', constant:9} }}>
              <img src={heart} width="25" height="25"/>
            </Link>
              <span className="menu-name">9X TABLE</span>
            <Link className="stopwatch-btn" to={{ pathname: '/math', state: { operator: 'mul', gamemode:'countdown', constant:9} }}>
              <img src={stopwatch} width="25" height="25"/>
            </Link>
          </div>

          <div className="menu-btns times-table">
            <Link className="health-btn" to={{ pathname: '/math', state: { operator: 'mul', gamemode:'health', constant:8} }}>
              <img src={heart} width="25" height="25"/>
            </Link>
              <span className="menu-name">8X TABLE</span>
            <Link className="stopwatch-btn" to={{ pathname: '/math', state: { operator: 'mul', gamemode:'countdown', constant:8} }}>
              <img src={stopwatch} width="25" height="25"/>
            </Link>
          </div>

          <div className="menu-btns times-table">
            <Link className="health-btn" to={{ pathname: '/math', state: { operator: 'mul', gamemode:'health', constant:7} }}>
              <img src={heart} width="25" height="25"/>
            </Link>
              <span className="menu-name">7X TABLE</span>
            <Link className="stopwatch-btn" to={{ pathname: '/math', state: { operator: 'mul', gamemode:'countdown', constant:7} }}>
              <img src={stopwatch} width="25" height="25"/>
            </Link>
          </div>

          <div className="menu-btns times-table">
            <Link className="health-btn" to={{ pathname: '/math', state: { operator: 'mul', gamemode:'health', constant:6} }}>
              <img src={heart} width="25" height="25"/>
            </Link>
              <span className="menu-name">6X TABLE</span>
            <Link className="stopwatch-btn" to={{ pathname: '/math', state: { operator: 'mul', gamemode:'countdown', constant:6} }}>
              <img src={stopwatch} width="25" height="25"/>
            </Link>
          </div>

          <div className="menu-btns times-table">
            <Link className="health-btn" to={{ pathname: '/math', state: { operator: 'mul', gamemode:'health', constant:5} }}>
              <img src={heart} width="25" height="25"/>
            </Link>
              <span className="menu-name">5X TABLE</span>
            <Link className="stopwatch-btn" to={{ pathname: '/math', state: { operator: 'mul', gamemode:'countdown', constant:5} }}>
              <img src={stopwatch} width="25" height="25"/>
            </Link>
          </div>

          <div className="menu-btns times-table">
            <Link className="health-btn" to={{ pathname: '/math', state: { operator: 'mul', gamemode:'health', constant:4} }}>
              <img src={heart} width="25" height="25"/>
            </Link>
              <span className="menu-name">4X TABLE</span>
            <Link className="stopwatch-btn" to={{ pathname: '/math', state: { operator: 'mul', gamemode:'countdown', constant:4} }}>
              <img src={stopwatch} width="25" height="25"/>
            </Link>
          </div>

          <div className="menu-btns times-table">
            <Link className="health-btn" to={{ pathname: '/math', state: { operator: 'mul', gamemode:'health', constant:3} }}>
              <img src={heart} width="25" height="25"/>
            </Link>
              <span className="menu-name">3X TABLE</span>
            <Link className="stopwatch-btn" to={{ pathname: '/math', state: { operator: 'mul', gamemode:'countdown', constant:3} }}>
              <img src={stopwatch} width="25" height="25"/>
            </Link>
          </div>

          <div className="menu-btns times-table">
            <Link className="health-btn" to={{ pathname: '/math', state: { operator: 'mul', gamemode:'health', constant:2} }}>
              <img src={heart} width="25" height="25"/>
            </Link>
              <span className="menu-name">2X TABLE</span>
            <Link className="stopwatch-btn" to={{ pathname: '/math', state: { operator: 'mul', gamemode:'countdown', constant:2} }}>
              <img src={stopwatch} width="25" height="25"/>
            </Link>
          </div> */}

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

      </main>
    );
  }
}

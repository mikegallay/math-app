/**
 * Modal component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';
import { Link } from 'react-router-dom';

import './Modal.scss';
import imageEmojiSunglasses from '../../images/icon_sunglasses.png';
import stopwatch from '../../images/stopwatch.png';
import heart from '../../images/heart.png';
import chestOpen from '../../images/chest-open.png';
import chestClose from '../../images/chest-close.png';
import Bonus from '../Bonus/Bonus';

// const minTrainingBonus = 500
// const minLevelBonus = 60

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: 'init false',
      openBonus: 'init false'
    };
  }

  componentWillReceiveProps(props){
    // console.log('modal update',props);
    if (props.visible != this.state.visible) {
      // console.log('modal here');
      this.setState({visible:props.visible})
    }
  }

  closeModal(){
    // console.log('modal close modal',this.props.closeModal);
    this.setState({visible:'init false', openBonus: 'init false'})
    if (this.props.closeModal) this.props.closeModal()
  }

  openModal(){
    this.setState({visible:true})
  }

  openBonus(){
    this.setState({openBonus:true})
  }

  render() {
    // let bonus = this.props.bonus;
    let score = this.props.score;
    let level = this.props.level;
    let accuracy = this.props.accuracy;
    let bonus = this.props.bonus;

    // console.log('modal render',this.props);
    let gameplayBtns = <div className="modal-btns"><button onClick={()=>this.closeModal()} className="modal-btn again-btn">Try Again</button> <Link className="modal-btn back-btn" to="/navigation">Main Menu</Link></div>
    if (!this.props.gameplayBtns) gameplayBtns = ''

    let headerImg = <div className="header-img-wrapper"><img src={imageEmojiSunglasses} width="125" height="125"/></div>

    //set new image when bonus is > 0
    let earnedBonus = (bonus>0);//((level == 0 && score > minTrainingBonus) || (level != 0 && accuracy > minLevelBonus))

    if (earnedBonus) headerImg = <div className="header-img-wrapper shake"><img src={chestClose} onClick={()=>{this.openBonus()}} width="125" height="125"/></div>

    if (!this.props.gameplayBtns) headerImg = ''

    if (earnedBonus && this.state.openBonus == true) headerImg = <div className="header-img-wrapper"><img src={chestOpen} width="125" height="125"/></div>

    let bonusRender = <div className="blankBonus"></div>
    // console.log('level1',score);
    if (earnedBonus) {
      bonusRender = <Bonus charm={this.props.charm} snackbar={(m)=>{this.props.snackbar(m)}} level={level} openBonus={this.state.openBonus} score={score} operator={this.props.operator} bonus={bonus} accuracy={accuracy}/>
    }
    return (
      <div className={`modal-wrapper ${this.state.visible}`}>
        <div className="modal-overlay">
          <div className="modal-content">
            {headerImg}
            <h2>{this.props.title}</h2>
            <div className="font-normal" dangerouslySetInnerHTML={{__html:this.props.body}}/>
            {gameplayBtns}
          </div>

          <button
            onClick={()=>this.closeModal()}
            className="close-btn">x</button>
        </div>
        {bonusRender}
      </div>
    );
  }
}

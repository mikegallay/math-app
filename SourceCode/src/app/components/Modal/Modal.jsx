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

export default class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: 'init false'
    };
  }

  closeModal(){
    this.setState({visible:false})
    if (this.props.closeModal) this.props.closeModal
  }

  openModal(){
    this.setState({visible:true})
  }

  render() {
    let gameplayBtns = <div className="modal-btns"><button onClick={this.props.closeModal} className="modal-btn again-btn">Try Again</button> <Link className="modal-btn back-btn" to="/">Main Menu</Link></div>
    if (!this.props.gameplayBtns) gameplayBtns = ''

    let headerImg = <div className="header-img-wrapper"><img src={imageEmojiSunglasses} width="125" height="125"/></div>

    if (this.props.bonus > 0) headerImg = <div className="header-img-wrapper shake"><img src={heart} width="125" height="125"/></div>
    if (!this.props.gameplayBtns) headerImg = ''

    return (
      <div className={`modal-wrapper ${this.props.visible}`}>
        <div className="modal-overlay">
          <div className="modal-content">
            {headerImg}
            <h2>{this.props.title}</h2>
            <div className="font-normal" dangerouslySetInnerHTML={{__html:this.props.body}}/>
            {gameplayBtns}
          </div>

          <button
            onClick={this.props.closeModal}
            className="close-btn">x</button>
        </div>
      </div>
    );
  }
}

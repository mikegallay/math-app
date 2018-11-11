/**
 * Modal component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';
import { Link } from 'react-router-dom';

import './Modal.scss';
import imageEmojiSunglasses from '../../images/icon_sunglasses.png';

export default class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className={`modal-wrapper ${this.props.visible}`}>
        <div className="modal-overlay">
          <div className="modal-content">
            <img src={imageEmojiSunglasses} width="125" height="125"/>
            <h2>{this.props.title}</h2>
            <div className="font-normal" dangerouslySetInnerHTML={{__html:this.props.body}}/>
            <button
              onClick={this.props.closeModal}
              className="modal-btn again-btn">Try Again</button>
            <Link className="modal-btn back-btn" to="/">Back to Main Menu</Link>
          </div>

          <button
            onClick={this.props.closeModal}
            className="close-btn">x</button>
        </div>
      </div>
    );
  }
}

/**
 * Modal component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';
import { Link } from 'react-router-dom';

import './Modal.scss';

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
            <h2>{this.props.title}</h2>
            <div className="font-normal" dangerouslySetInnerHTML={{__html:this.props.body}}/>
          </div>
          <button
            onClick={this.props.closeModal}
            className="close-btn">x</button>
        </div>
      </div>
    );
  }
}

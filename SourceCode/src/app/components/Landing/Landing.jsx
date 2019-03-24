/**
 * Navigation component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';
import { Link } from 'react-router-dom';

import './Landing.scss';

export default class Landing extends React.Component {
  constructor(props) {
    super(props);
    let hidden = true;
    this.state = {hidden};
  }

  componentWillMount(){
    //hide the layout until the css is loaded
    let hider = setTimeout(() => {
      let hidden = false
      this.setState({hidden});
    }, 1000)
  }

  render() {
    let display = (!this.state.hidden)?'flex':'none'
    let styles = {display};

    return (
      <div className="main landing" >
        <div className="wrapper" style={styles}>
          <h1 className="landing-title">NAME</h1>
          <div className="landing-buttons">
              <Link to='/legend' className='landing-btn mdl-button mdl-js-button mdl-button--raised mdl-button--accent'><i className="material-icons">brightness_7</i> LEGEND </Link>
              <Link to='/login' className='landing-btn mdl-button mdl-js-button mdl-button--raised mdl-button--accent'><i className="material-icons">terrain</i> QUEST </Link>
            </div>
            <p className="credit">© 2018 Mike Gallay</p>
        </div>
      </div>
    );
  }
}

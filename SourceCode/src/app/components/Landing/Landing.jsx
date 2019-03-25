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
    let opacity = (!this.state.hidden)?1:0
    let styles = {opacity};

    return (
      <div className="main landing">
        <div className="main-fade" style={styles}>
          <div className="wrapper">
            <h1 className="landing-title">NAME</h1>
            <div className="landing-buttons">
                <Link to='/legend' className='landing-btn mdl-button mdl-js-button mdl-button--raised mdl-button--accent'><i className="material-icons">brightness_7</i> LEGEND </Link>
                <Link to='/login' className='landing-btn mdl-button mdl-js-button mdl-button--raised mdl-button--accent'><i className="material-icons">terrain</i> QUEST </Link>
              </div>
              <p className="credit">© 2018 Mike Gallay</p>
          </div>
        </div>
      </div>
    );
  }
}

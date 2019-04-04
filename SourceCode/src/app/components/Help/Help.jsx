/**
 * Help component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';
import { Link } from 'react-router-dom';

import './Help.scss';
import SecondaryNav from '../SecondaryNav/SecondaryNav';

export default class Help extends React.Component {
  constructor(props) {
    super(props);
    let hidden = true;
    var locUser = JSON.parse(localStorage.getItem('localUser'));
    this.state = {hidden,locUser};
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

    let navRender = <SecondaryNav currpage="help"/>;
    if (!this.state.locUser) navRender = <div className="no-locUser">
    <Link to='/login' className='help-btn mdl-button mdl-js-button mdl-button--raised mdl-button--accent'><i className="material-icons">terrain</i> QUEST </Link>
    <Link to='/legend' className='help-btn mdl-button mdl-js-button mdl-button--raised mdl-button--accent'><i className="material-icons">flare</i>LEGEND </Link>
    </div>

    return (
      <div className="profile main">
        <div className="main-fade" style={styles}>
          <div className="wrapper">
            <h1>Help</h1>

            {navRender}

          </div>
        </div>
      </div>
    );
  }
}

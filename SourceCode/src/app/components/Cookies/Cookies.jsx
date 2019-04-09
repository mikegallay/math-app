/**
 * Help component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';
// import { Link } from 'react-router-dom';
import {hideTimer} from "../../config/constants";
import './Cookies.scss';

export default class Cookies extends React.Component {
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
    }, hideTimer)
  }

  render() {

    let opacity = (!this.state.hidden)?1:0
    let styles = {opacity};

    return (
      <div className="cookies main">
        <div className="main-fade" style={styles}>
          <div className="wrapper">
            <h1>Chocolate Chip</h1>
          </div>
        </div>
      </div>
    );
  }
}

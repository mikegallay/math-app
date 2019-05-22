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
            <h1>Cookies & Data Storage</h1>
            <p>QuestCaster stores cookies and data in your browser to save your progress in the game and provide basic analytics. We will never save any personal information or sell your data.</p>

            <h2>Local Storage</h2>
            <p>QuestCaster uses your browser's Local Storage to store your game progress. It also uses it to establish a connection with FireBase, a Google database where an addition version of your progress is stored so you are able to retain your game progress across multiple devices.</p>
            <p><strong>firebase:host:math-app-8deb6.firebaseio.com</strong></p>
            <p className="mb0"></p>
            <hr/>
            <p className="mb0"><strong>cookiepolicy</strong><em> {`{"accept":true}`}</em></p>
            <p className="mb0">This data is stored when you accept the cookie policy.</p>
            <hr/>

            <p className="mb0"><strong>appToken</strong></p>
            <p className="mb0"></p>
            <hr/>
            <p className="mb0"><strong>localUser</strong></p>
            <p className="mb0"></p>
            <hr/>

            <h2>Cookies</h2>
            <p>Cookies are text files containing small amounts of information which are downloaded onto your computer or device.</p>
            <p className="mb0"><strong>Google</strong> - Ad Network, Publisher</p>
            <p className="mb0"><strong>Cookie Name:</strong> _ga, _gat, _gid</p>
            <p>These cookies allow us to count page visits and traffic sources so we can measure and improve the performance of our site. Google stores the information collected by the cookie on servers in the United States. Google may also transfer this information to third parties where required to do so by law, or where such third parties process the information on Google's behalf. Google will not associate your IP address with any other data held by Google.</p>
          </div>
        </div>
      </div>
    );
  }
}

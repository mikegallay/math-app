/**
 * Creatures component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';
import { Link } from 'react-router-dom';

import './SecondaryNav.scss';

export default class SecondaryNav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="secondary-nav">
        <Link to='/navigation' className={`snav ${(this.props.currpage=="navigation")?"active":""}`}><i className="material-icons">terrain</i></Link>
        <Link to='/profile' className={`snav ${(this.props.currpage=="profile")?"active":""}`}><i className="material-icons">person</i></Link>
        <Link to='/creatures' className={`snav ${(this.props.currpage=="creatures")?"active":""}`}><i className="material-icons">child_care</i></Link>
        <Link to='/store' className={`snav ${(this.props.currpage=="store")?"active":""}`}><i className="material-icons">flare</i></Link>
        <Link to='/help' className={`snav ${(this.props.currpage=="help")?"active":""}`}><i className="material-icons">help</i></Link>
      </div>
    );
  }
}

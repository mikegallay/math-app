/**
 * Stats component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';
import { Link } from 'react-router-dom';

import './Stats.scss';

const localUser = "localUser";

export default class Stats extends React.Component {
  constructor(props) {
    super(props);

    //check current high score
    // localStorage.setItem(localUser, JSON.stringify(existingData));
    var locUser = JSON.parse(localStorage.getItem(localUser));
    console.log('main',locUser, (locUser));

  }

  render() {

    return (
      <main className="page-main">
        <h1>Statistics</h1>
        <span className="active">View Statistics</span>
        <Link to='/creatures' className='stats-btn'> View Creatures</Link>
        <div className="main-menu">

        </div>

      </main>
    );
  }
}

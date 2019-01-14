/**
 * Creatures component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';
import { Link } from 'react-router-dom';

import './Creatures.scss';

const localUser = "localUser";

export default class Creatures extends React.Component {
  constructor(props) {
    super(props);

    //check current high score
    // localStorage.setItem(localUser, JSON.stringify(existingData));
    var locUser = JSON.parse(localStorage.getItem(localUser));
    console.log('main',locUser, (locUser));

  }

  render() {
    var locUser = JSON.parse(localStorage.getItem(localUser));

    return (
      <main className="page-main">
        <h1>Creatures</h1>
        <Link to='/statistics' className='stats-btn'> View Statistics </Link>
        <span className="active">View Creatures</span>
        <div className="creature-list">
          <div className="creature-section">
            <h2>Addition - Common</h2>
            <div className="creatures">
              <div className={`creature ${(locUser.creatures.add.c01)?'gotit':''}`}>C01</div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

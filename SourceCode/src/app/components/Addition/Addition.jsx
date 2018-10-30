/**
 * Addition component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';

import './Addition.scss';
import GamePlay from '../GamePlay/GamePlay';

export default class Addition extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <GamePlay data={{mode:'lives',version:'add'}}/>
      </div>
    );
  }
}

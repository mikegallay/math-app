/**
 * Bonus component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';

import './Tutorial.scss';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

export default class Tutorial extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    let gamemode = this.props.gamemode;
    let toRender = <TrainingTutorial />

    if (gamemode == "battle") toRender = <BattleTutorial />

    return (
      <div className="tutorial">
        {toRender}
      </div>
    );

  }
}

const TrainingTutorial = () => (
  <Carousel>
    <div>
      <img src="/public/images/tutorial-f1.jpg" />
    </div>
    <div>
      <img src="/public/images/tutorial-f2.jpg" />
    </div>
    <div>
      <img src="/public/images/tutorial-f3.jpg" />
    </div>
    <div>
      <img src="/public/images/tutorial-f1.jpg" />
      <p className='close-btn landing-btn mdl-button mdl-js-button mdl-button--raised mdl-button--accent'>Close Tutorial</p>
    </div>
  </Carousel>
);

const BattleTutorial = () => (
  <Carousel>
    <div>
      <img src="/public/images/tutorial-f3.jpg" />
    </div>
    <div>
      <img src="/public/images/tutorial-f1.jpg" />
      <p className='close-btn landing-btn mdl-button mdl-js-button mdl-button--raised mdl-button--accent'>Close Tutorial</p>
    </div>
  </Carousel>
);

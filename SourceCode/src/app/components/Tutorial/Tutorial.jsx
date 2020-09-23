/**
 * Bonus component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';

import './Tutorial.scss';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import tut1 from '../../images/tutorial-f1.jpg';
import tut2 from '../../images/tutorial-f2.jpg';
import tut3 from '../../images/tutorial-f3.jpg';

export default class Tutorial extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    let gamemode = this.props.gamemode;
    let toRender = <TrainingTutorial hideTutorial={this.props.hideTutorial}/>

    if (gamemode == "battle") toRender = <BattleTutorial hideTutorial={this.props.hideTutorial}/>
    if (gamemode == "final") toRender = <FinalTutorial hideTutorial={this.props.hideTutorial}/>

    return (
      <div className="tutorial">
        {toRender}
      </div>
    );

  }
}

const TrainingTutorial = ({hideTutorial}) => (
  <Carousel>
    <div>
      <img src="/images/tutorial-f1.jpg" />
    </div>
    <div>
      <img src="/images/tutorial-f2.jpg" />
    </div>
    <div>
      <img src="/images/tutorial-f3.jpg" />
    </div>
    <div>
      <img src="/images/tutorial-f1.jpg" />
      <button onClick={hideTutorial} className='close-btn landing-btn mdl-button mdl-js-button mdl-button--raised mdl-button--accent'>Close Tutorial</button>
    </div>
  </Carousel>
);

const BattleTutorial = ({hideTutorial}) => (
  <Carousel>
    <div>
      <img src="/images/tutorial-f3.jpg" />
    </div>
    <div>
      <img src="/images/tutorial-f1.jpg" />
      <p onClick={hideTutorial} className='close-btn landing-btn mdl-button mdl-js-button mdl-button--raised mdl-button--accent'>Close Tutorial</p>
    </div>
  </Carousel>
);

const FinalTutorial = ({hideTutorial}) => (
  <Carousel>
    <div>
      <img src="/images/tutorial-f1.jpg" />
      <p onClick={hideTutorial} className='close-btn landing-btn mdl-button mdl-js-button mdl-button--raised mdl-button--accent'>Close Tutorial</p>
    </div>
  </Carousel>
);

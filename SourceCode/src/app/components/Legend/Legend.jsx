/**
 * Navigation component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';
import { Link } from 'react-router-dom';

import './Legend.scss';

export default class Legend extends React.Component {
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
    let display = (!this.state.hidden)?'block':'none'
    let styles = {display};

    return (
      <div className="main legend">
        <div className="wrapper" style={styles}>
          <h1 className="legend-title">NAME</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac sollicitudin diam, ut mollis ex. Sed cursus odio a risus vulputate porta. Aliquam sit amet imperdiet tortor, sit amet placerat orci. Nunc ultrices efficitur eros, sed interdum risus. Integer aliquam, nulla ac malesuada sollicitudin, tellus dolor faucibus ante, eget euismod felis ex a dolor. Nulla lacinia accumsan ultricies. Proin accumsan elementum sem vel vehicula. In maximus gravida enim, condimentum mollis enim porta eget. Aenean ac augue vehicula quam ornare euismod vel at arcu. Vivamus placerat lorem mauris, vel ultricies ex ultricies tempor. Curabitur sit amet turpis nec nisl bibendum suscipit in a arcu. Fusce nec tincidunt orci. Donec nisi odio, vehicula sed rutrum ut, rhoncus in tortor.</p>
          <p>Nulla lacinia accumsan ultricies. Proin accumsan elementum sem vel vehicula. In maximus gravida enim, condimentum mollis enim porta eget. Aenean ac augue vehicula quam ornare euismod vel at arcu. Vivamus placerat lorem mauris, vel ultricies ex ultricies tempor. Curabitur sit amet turpis nec nisl bibendum suscipit in a arcu. Fusce nec tincidunt orci. Donec nisi odio, vehicula sed rutrum ut, rhoncus in tortor.</p>
          <p>Integer aliquam, nulla ac malesuada sollicitudin, tellus dolor faucibus ante, eget euismod felis ex a dolor. Nulla lacinia accumsan ultricies. Proin accumsan elementum sem vel vehicula. In maximus gravida enim, condimentum mollis enim porta eget. Aenean ac augue vehicula quam ornare euismod vel at arcu. Vivamus placerat lorem mauris, vel ultricies ex ultricies tempor. </p>
          <Link to='/login' className='landing-btn mdl-button mdl-js-button mdl-button--raised mdl-button--accent'><i className="material-icons">terrain</i> BEGIN QUEST </Link>
          <p className="credit">© 2018 Mike Gallay</p>
        </div>
      </div>
    );
  }
}

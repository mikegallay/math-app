/**
 * Bonus component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';
import './SnackBar.scss';

export default class SnackBar extends React.Component {
  constructor(props) {
    super(props);
    let active = this.props.active;
    let message = this.props.message;
    this.state = {active,message};
  }

  componentWillReceiveProps(props){
    // console.log('snackbarprops',props);
    // console.log(props.active,this.state.active);
    if (props.active != this.state.active){
      console.log('yes');
      let active = props.active;
      let message = props.message;
      this.setState({active,message})
    }
  }

  render() {
    // console.log('render snackbar',this.state.active,this.state.message);
    return (
      <div className={`snackbar ${(this.state.active)?'active':''}`}>
        <div className="snackbar-message">
          {this.state.message}
        </div>
      </div>
    );
  }
}

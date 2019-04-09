/**
 * Help component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';
import { Link } from 'react-router-dom';
import {hideTimer} from "../../config/constants";
import './Help.scss';
import SecondaryNav from '../SecondaryNav/SecondaryNav';

const paragraph = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet natus sint provident vel ab reprehenderit cum soluta, suscipit facere nisi sed earum repellendus fuga debitis, nam molestiae minima voluptates possimus.<br><br>Bully!'

const data = [
  {
    title: 'Save to Homescreen',
    paragraph
  },
  {
    title: 'Delete Account',
    paragraph: paragraph + paragraph + paragraph
  },
  {
    title: 'Game Play/Training',
    paragraph
  },
  {
    title: 'Game Play/Battle',
    paragraph
  },
  {
    title: 'Staffs',
    paragraph
  },
  {
    title: 'Gems',
    paragraph
  },
  {
    title: 'Creatures',
    paragraph
  }
]

export default class Help extends React.Component {
  constructor(props) {
    super(props);
    let hidden = true;
    var locUser = JSON.parse(localStorage.getItem('localUser'));
    this.state = {hidden,locUser};
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

    let navRender = <SecondaryNav currpage="help"/>;
    if (!this.state.locUser) navRender = <div className="no-locUser">
    <Link to='/login' className='help-btn mdl-button mdl-js-button mdl-button--raised mdl-button--accent'><i className="material-icons">terrain</i> QUEST </Link>
    <Link to='/legend' className='help-btn mdl-button mdl-js-button mdl-button--raised mdl-button--accent'><i className="material-icons">flare</i>LEGEND </Link>
    </div>

    return (
      <div className="profile main">
        <div className="main-fade" style={styles}>
          <div className="wrapper">
            <h1>Help</h1>

            {navRender}
            <div className="intro">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis hendrerit justo. Curabitur non luctus sem, in sagittis est. Nulla facilisi. Curabitur lectus leo, lobortis sed tincidunt vitae, fermentum sed mi.</div>
            <ul className='accordion-list'>
              {data.map((data, key) => {
                return (
                  <li className='accordion-list__item' key={key}>
                    <AccordionItem
                    title={data.title}
                    paragraph={data.paragraph}/>
                  </li>
                )
              })}
            </ul>

          </div>
        </div>
      </div>
    );
  }
}

class AccordionItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      opened: false
    }
  }

  render () {
    const {
      props: {
        paragraph,
        title
      },
      state: {
        opened
      }
    } = this

    return (
      <div className={`accordion-item ${this.state.opened?'accordion-item--opened':''}`}
          onClick={() => { this.setState({ opened: !opened }) }}>
        <div className={'accordion-item__line'}>
          <h3 className={'accordion-item__title'}>
            {title}
          </h3>
          <span className={'accordion-item__icon'}/>
        </div>
          <div className='accordion-item__inner'>
            <div className='accordion-item__content'>
              <p className='accordion-item__paragraph'
                dangerouslySetInnerHTML={{__html:paragraph}}>
              </p>
            </div>
          </div>
      </div>
    )
  }
}

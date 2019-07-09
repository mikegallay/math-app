/**
 * Stats component
 *
 * Description of component... lorem ipsum dolor sit amet consectetur adipiscing elit
 */

import React from 'react';
import { Link } from 'react-router-dom';
import {logout} from "../../services/auth";
import {ref,hideTimer} from "../../config/constants";

const localUser = "localUser";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    var locUser = JSON.parse(localStorage.getItem("localUser"));
    this.state = {locUser};

  }

  //training
  forest0(){
    let lu = this.state.locUser;
    lu.creatures.add.L1_1_1 = lu.creatures.add.L1_1_2 = lu.creatures.add.L1_1_3 = true
    localStorage.setItem(localUser, JSON.stringify(lu));
    ref.ref('/users/' + lu.userid + '/creatures/add').set(lu.creatures.add);
  }
  rock0(){
    let lu = this.state.locUser;
    lu.creatures.sub.L1_1_1 = lu.creatures.sub.L1_1_2 = lu.creatures.sub.L1_1_3 = true
    localStorage.setItem(localUser, JSON.stringify(lu));
    ref.ref('/users/' + lu.userid + '/creatures/sub').set(lu.creatures.sub);
  }
  water0(){
    let lu = this.state.locUser;
    lu.creatures.mul.L1_1_1 = lu.creatures.mul.L1_1_2 = lu.creatures.mul.L1_1_3 = true
    localStorage.setItem(localUser, JSON.stringify(lu));
    ref.ref('/users/' + lu.userid + '/creatures/mul').set(lu.creatures.mul);
  }
  fire0(){
    let lu = this.state.locUser;
    lu.creatures.div.L1_1_1 = lu.creatures.div.L1_1_2 = lu.creatures.div.L1_1_3 = true
    localStorage.setItem(localUser, JSON.stringify(lu));
    ref.ref('/users/' + lu.userid + '/creatures/div').set(lu.creatures.div);
  }
  all0(){
    this.forest0(); this.rock0(); this.water0(); this.fire0();
  }

  //level1
  forest1(){
    let lu = this.state.locUser;
    lu.creatures.add.L2_1_1 = lu.creatures.add.L2_1_2 = lu.creatures.add.L2_1_3 = lu.creatures.add.L2_2_1 = lu.creatures.add.L2_2_2 = lu.creatures.add.L2_2_3 = true
    localStorage.setItem(localUser, JSON.stringify(lu));
    ref.ref('/users/' + lu.userid + '/creatures/add').set(lu.creatures.add);
  }
  rock1(){
    let lu = this.state.locUser;
    lu.creatures.sub.L2_1_1 = lu.creatures.sub.L2_1_2 = lu.creatures.sub.L2_1_3 = lu.creatures.sub.L2_2_1 = lu.creatures.sub.L2_2_2 = lu.creatures.sub.L2_2_3 = true
    localStorage.setItem(localUser, JSON.stringify(lu));
    ref.ref('/users/' + lu.userid + '/creatures/sub').set(lu.creatures.sub);
  }
  water1(){
    let lu = this.state.locUser;
    lu.creatures.mul.L2_1_1 = lu.creatures.mul.L2_1_2 = lu.creatures.mul.L2_1_3 = lu.creatures.mul.L2_2_1 = lu.creatures.mul.L2_2_2 = lu.creatures.mul.L2_2_3 = true
    localStorage.setItem(localUser, JSON.stringify(lu));
    ref.ref('/users/' + lu.userid + '/creatures/mul').set(lu.creatures.mul);
  }
  fire1(){
    let lu = this.state.locUser;
    lu.creatures.div.L2_1_1 = lu.creatures.div.L2_1_2 = lu.creatures.div.L2_1_3 = lu.creatures.div.L2_2_1 = lu.creatures.div.L2_2_2 = lu.creatures.div.L2_2_3 = true
    localStorage.setItem(localUser, JSON.stringify(lu));
    ref.ref('/users/' + lu.userid + '/creatures/div').set(lu.creatures.div);

  }
  all1(){
    this.forest1(); this.rock1(); this.water1(); this.fire1();
  }
  forest2(){
    let lu = this.state.locUser;
    lu.creatures.add.L3_1_1 = lu.creatures.add.L3_1_2 = lu.creatures.add.L3_1_3 = lu.creatures.add.L3_2_1 = lu.creatures.add.L3_2_2 = lu.creatures.add.L3_2_3 = lu.creatures.add.L3_3_1 = lu.creatures.add.L3_3_2 = lu.creatures.add.L3_3_3 = lu.creatures.add.L3_4_1 = lu.creatures.add.L3_4_2 = lu.creatures.add.L3_4_3 = true
    localStorage.setItem(localUser, JSON.stringify(lu));
    ref.ref('/users/' + lu.userid + '/creatures/add').set(lu.creatures.add);
  }
  rock2(){
    let lu = this.state.locUser;
    lu.creatures.sub.L3_1_1 = lu.creatures.sub.L3_1_2 = lu.creatures.sub.L3_1_3 = lu.creatures.sub.L3_2_1 = lu.creatures.sub.L3_2_2 = lu.creatures.sub.L3_2_3 = lu.creatures.sub.L3_3_1 = lu.creatures.sub.L3_3_2 = lu.creatures.sub.L3_3_3 = lu.creatures.sub.L3_4_1 = lu.creatures.sub.L3_4_2 = lu.creatures.sub.L3_4_3 = true
    localStorage.setItem(localUser, JSON.stringify(lu));
    ref.ref('/users/' + lu.userid + '/creatures/sub').set(lu.creatures.sub);
  }
  water2(){
    let lu = this.state.locUser;
    lu.creatures.mul.L3_1_1 = lu.creatures.mul.L3_1_2 = lu.creatures.mul.L3_1_3 = lu.creatures.mul.L3_2_1 = lu.creatures.mul.L3_2_2 = lu.creatures.mul.L3_2_3 = lu.creatures.mul.L3_3_1 = lu.creatures.mul.L3_3_2 = lu.creatures.mul.L3_3_3 = lu.creatures.mul.L3_4_1 = lu.creatures.mul.L3_4_2 = lu.creatures.mul.L3_4_3 = true
    localStorage.setItem(localUser, JSON.stringify(lu));
    ref.ref('/users/' + lu.userid + '/creatures/mul').set(lu.creatures.mul);
  }
  fire2(){
    let lu = this.state.locUser;
    lu.creatures.div.L3_1_1 = lu.creatures.div.L3_1_2 = lu.creatures.div.L3_1_3 = lu.creatures.div.L3_2_1 = lu.creatures.div.L3_2_2 = lu.creatures.div.L3_2_3 = lu.creatures.div.L3_3_1 = lu.creatures.div.L3_3_2 = lu.creatures.div.L3_3_3 = lu.creatures.div.L3_4_1 = lu.creatures.div.L3_4_2 = lu.creatures.div.L3_4_3 = true
    localStorage.setItem(localUser, JSON.stringify(lu));
    ref.ref('/users/' + lu.userid + '/creatures/div').set(lu.creatures.div);
  }
  all2(){
    this.forest2(); this.rock2(); this.water2(); this.fire2();
  }
  money(){
    let lu = this.state.locUser;
    lu.gems = 5000;
    localStorage.setItem(localUser, JSON.stringify(lu));
    ref.ref('/users/' + lu.userid + '/gems').set(lu.gems);
  }
  staffs(){
    let lu = this.state.locUser;
    lu.staffs.forest.ready = lu.staffs.rock.ready = lu.staffs.water.ready = lu.staffs.fire.ready = true;
    localStorage.setItem(localUser, JSON.stringify(lu));
    ref.ref('/users/' + lu.userid + '/staffs').set(lu.staffs);
  }

  render() {
    return (
      <div className="jumpSettings">
        <h5>Jump Settings</h5>
        <button onClick={() => {this.forest0()}}>forest0</button>
        <button onClick={() => {this.rock0()}}>rock0</button>
        <button onClick={() => {this.water0()}}>water0</button>
        <button onClick={() => {this.fire0()}}>fire0</button>
        <button onClick={() => {this.all0()}}>all0</button><br/>
        <button onClick={() => {this.forest1()}}>forest1</button>
        <button onClick={() => {this.rock1()}}>rock1</button>
        <button onClick={() => {this.water1()}}>water1</button>
        <button onClick={() => {this.fire1()}}>fire1</button>
        <button onClick={() => {this.all1()}}>all1</button><br/>
        <button onClick={() => {this.forest2()}}>forest2</button>
        <button onClick={() => {this.rock2()}}>rock2</button>
        <button onClick={() => {this.water2()}}>water2</button>
        <button onClick={() => {this.fire2()}}>fire2</button>
        <button onClick={() => {this.all2()}}>all2</button><br/>
        <button onClick={() => {this.staffs()}}>staffs</button>
        <button onClick={() => {this.money()}}>money</button>
      </div>
    );
  }
}

import firebase from 'firebase'

const config = {

};

firebase.initializeApp(config);

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const ref = firebase.database();
export const firebaseAuth = firebase.auth;

export const creatureList = {
  math:{
    add:{
      c01:{img:'add01',name:'mike',credit:'Mike G'},
      c02:{img:'add02',name:'sydney',credit:'Sydney G'},
      c03:{img:'add03',name:'sydney',credit:'Sydney G'},
      r01:{img:'sub01',name:'mike',credit:'Mike G'}
    }
  }
}

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
      c01:{img:'creature',name:'mike',credit:'Mike G'},
      c02:{img:'creature1',name:'sydney',credit:'Sydney G'},
      r01:{img:'creatureGold',name:'mike',credit:'Mike G'}
    }
  }
}

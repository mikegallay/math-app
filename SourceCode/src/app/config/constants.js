import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyCU9x4rn13LXKhlsly5Y80WZYC2C5aYEdI",
    authDomain: "math-app-8deb6.firebaseapp.com",
    databaseURL: "https://math-app-8deb6.firebaseio.com",
    projectId: "math-app-8deb6",
    storageBucket: "math-app-8deb6.appspot.com",
    messagingSenderId: "588893631758"
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

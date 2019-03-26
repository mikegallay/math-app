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
      L1_1_1:{img:'A1_1_1',name:'abc'},
      L1_1_2:{img:'A1_1_2',name:'abc'},
      L1_1_3:{img:'A1_1_3',name:'abc'},
      L2_1_1:{img:'A2_1_1',name:'abc'},
      L2_1_2:{img:'A2_1_2',name:'abc'},
      L2_1_3:{img:'A2_1_3',name:'abc'},
      L2_2_1:{img:'A2_2_1',name:'abc'},
      L2_2_2:{img:'A2_2_2',name:'abc'},
      L2_2_3:{img:'A2_2_3',name:'abc'},
      L3_1_1:{img:'A3_1_1',name:'abc'},
      L3_1_2:{img:'A3_1_2',name:'abc'},
      L3_1_3:{img:'A3_1_3',name:'abc'},
      L3_2_1:{img:'A3_2_1',name:'abc'},
      L3_2_2:{img:'A3_2_2',name:'abc'},
      L3_2_3:{img:'A3_2_3',name:'abc'},
      L3_3_1:{img:'A3_3_1',name:'abc'},
      L3_3_2:{img:'A3_3_2',name:'abc'},
      L3_3_3:{img:'A3_3_3',name:'abc'},
      L3_4_1:{img:'A3_4_1',name:'abc'},
      L3_4_2:{img:'A3_4_2',name:'abc'},
      L3_4_3:{img:'A3_4_3',name:'abc'}
    },
    sub:{
      L1_1_1:{img:'S1_1_1',name:'abc'},
      L1_1_2:{img:'S1_1_2',name:'abc'},
      L1_1_3:{img:'S1_1_3',name:'abc'},
      L2_1_1:{img:'S2_1_1',name:'abc'},
      L2_1_2:{img:'S2_1_2',name:'abc'},
      L2_1_3:{img:'S2_1_3',name:'abc'},
      L2_2_1:{img:'S2_2_1',name:'abc'},
      L2_2_2:{img:'S2_2_2',name:'abc'},
      L2_2_3:{img:'S2_2_3',name:'abc'},
      L3_1_1:{img:'S3_1_1',name:'abc'},
      L3_1_2:{img:'S3_1_2',name:'abc'},
      L3_1_3:{img:'S3_1_3',name:'abc'},
      L3_2_1:{img:'S3_2_1',name:'abc'},
      L3_2_2:{img:'S3_2_2',name:'abc'},
      L3_2_3:{img:'S3_2_3',name:'abc'},
      L3_3_1:{img:'S3_3_1',name:'abc'},
      L3_3_2:{img:'S3_3_2',name:'abc'},
      L3_3_3:{img:'S3_3_3',name:'abc'},
      L3_4_1:{img:'S3_4_1',name:'abc'},
      L3_4_2:{img:'S3_4_2',name:'abc'},
      L3_4_3:{img:'S3_4_3',name:'abc'}
    },
    mul:{
      L1_1_1:{img:'M1_1_1',name:'abc'},
      L1_1_2:{img:'M1_1_2',name:'abc'},
      L1_1_3:{img:'M1_1_3',name:'abc'},
      L2_1_1:{img:'M2_1_1',name:'abc'},
      L2_1_2:{img:'M2_1_2',name:'abc'},
      L2_1_3:{img:'M2_1_3',name:'abc'},
      L2_2_1:{img:'M2_2_1',name:'abc'},
      L2_2_2:{img:'M2_2_2',name:'abc'},
      L2_2_3:{img:'M2_2_3',name:'abc'},
      L3_1_1:{img:'M3_1_1',name:'abc'},
      L3_1_2:{img:'M3_1_2',name:'abc'},
      L3_1_3:{img:'M3_1_3',name:'abc'},
      L3_2_1:{img:'M3_2_1',name:'abc'},
      L3_2_2:{img:'M3_2_2',name:'abc'},
      L3_2_3:{img:'M3_2_3',name:'abc'},
      L3_3_1:{img:'M3_3_1',name:'abc'},
      L3_3_2:{img:'M3_3_2',name:'abc'},
      L3_3_3:{img:'M3_3_3',name:'abc'},
      L3_4_1:{img:'M3_4_1',name:'abc'},
      L3_4_2:{img:'M3_4_2',name:'abc'},
      L3_4_3:{img:'M3_4_3',name:'abc'}
    },
    div:{
      L1_1_1:{img:'D1_1_1',name:'abc'},
      L1_1_2:{img:'D1_1_2',name:'abc'},
      L1_1_3:{img:'D1_1_3',name:'abc'},
      L2_1_1:{img:'D2_1_1',name:'abc'},
      L2_1_2:{img:'D2_1_2',name:'abc'},
      L2_1_3:{img:'D2_1_3',name:'abc'},
      L2_2_1:{img:'D2_2_1',name:'abc'},
      L2_2_2:{img:'D2_2_2',name:'abc'},
      L2_2_3:{img:'D2_2_3',name:'abc'},
      L3_1_1:{img:'D3_1_1',name:'abc'},
      L3_1_2:{img:'D3_1_2',name:'abc'},
      L3_1_3:{img:'D3_1_3',name:'abc'},
      L3_2_1:{img:'D3_2_1',name:'abc'},
      L3_2_2:{img:'D3_2_2',name:'abc'},
      L3_2_3:{img:'D3_2_3',name:'abc'},
      L3_3_1:{img:'D3_3_1',name:'abc'},
      L3_3_2:{img:'D3_3_2',name:'abc'},
      L3_3_3:{img:'D3_3_3',name:'abc'},
      L3_4_1:{img:'D3_4_1',name:'abc'},
      L3_4_2:{img:'D3_4_2',name:'abc'},
      L3_4_3:{img:'D3_4_3',name:'abc'}
    },
    ran:{
      queen:{img:'L',name:'abc'}
    }
  }
}

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

export const hideTimer = 750;
export const staffBase = 500; //default base damage
export const creatureCount = [3,6,9]; //creatures per level 1-9
export const trainingTotal = 3; //the number of questions in training.
export const trainingChances = 5; //number of chances before training ends.

export const spriteQuotes = [
  "You can do it!",
  "Keep going! We need your help!",
  "You are getting smarter and smarter."
]

export const creatureList = {
  math:{
    add:{
      L1_1_1:{img:'A1_1_1',name:'Sir Reginald<br>Stinks-a-lot',reward:500,freq:'common'},
      L1_1_2:{img:'A1_1_2',name:'abc',reward:700,freq:'rare'},
      L1_1_3:{img:'A1_1_3',name:'abc',reward:1000,freq:'ultrarare'},
      L2_1_1:{img:'A2_1_1',name:'abc',reward:60,freq:'common'},
      L2_1_2:{img:'A2_1_2',name:'abc',reward:70,freq:'rare'},
      L2_1_3:{img:'A2_1_3',name:'abc',reward:90,freq:'ultrarare'},
      L2_2_1:{img:'A2_2_1',name:'abc',reward:75,freq:'common'},
      L2_2_2:{img:'A2_2_2',name:'abc',reward:85,freq:'rare'},
      L2_2_3:{img:'A2_2_3',name:'abc',reward:95,freq:'ultrarare'},
      L3_1_1:{img:'A3_1_1',name:'abc',reward:60,freq:'common'},
      L3_1_2:{img:'A3_1_2',name:'abc',reward:70,freq:'rare'},
      L3_1_3:{img:'A3_1_3',name:'abc',reward:92,freq:'ultrarare'},
      L3_2_1:{img:'A3_2_1',name:'abc',reward:65,freq:'common'},
      L3_2_2:{img:'A3_2_2',name:'abc',reward:75,freq:'rare'},
      L3_2_3:{img:'A3_2_3',name:'abc',reward:94,freq:'ultrarare'},
      L3_3_1:{img:'A3_3_1',name:'abc',reward:75,freq:'common'},
      L3_3_2:{img:'A3_3_2',name:'abc',reward:85,freq:'rare'},
      L3_3_3:{img:'A3_3_3',name:'abc',reward:96,freq:'ultrarare'}
    },
    sub:{
      L1_1_1:{img:'S1_1_1',name:'abc',reward:500,freq:'common'},
      L1_1_2:{img:'S1_1_2',name:'abc',reward:750,freq:'rare'},
      L1_1_3:{img:'S1_1_3',name:'abc',reward:1000,freq:'ultrarare'},
      L2_1_1:{img:'S2_1_1',name:'abc',reward:60,freq:'common'},
      L2_1_2:{img:'S2_1_2',name:'abc',reward:70,freq:'rare'},
      L2_1_3:{img:'S2_1_3',name:'abc',reward:90,freq:'ultrarare'},
      L2_2_1:{img:'S2_2_1',name:'abc',reward:75,freq:'common'},
      L2_2_2:{img:'S2_2_2',name:'abc',reward:85,freq:'rare'},
      L2_2_3:{img:'S2_2_3',name:'abc',reward:95,freq:'ultrarare'},
      L3_1_1:{img:'S3_1_1',name:'abc',reward:60,freq:'common'},
      L3_1_2:{img:'S3_1_2',name:'abc',reward:70,freq:'rare'},
      L3_1_3:{img:'S3_1_3',name:'abc',reward:92,freq:'ultrarare'},
      L3_2_1:{img:'S3_2_1',name:'abc',reward:65,freq:'common'},
      L3_2_2:{img:'S3_2_2',name:'abc',reward:75,freq:'rare'},
      L3_2_3:{img:'S3_2_3',name:'abc',reward:94,freq:'ultrarare'},
      L3_3_1:{img:'S3_3_1',name:'abc',reward:75,freq:'common'},
      L3_3_2:{img:'S3_3_2',name:'abc',reward:85,freq:'rare'},
      L3_3_3:{img:'S3_3_3',name:'abc',reward:96,freq:'ultrarare'}
    },
    mul:{
      L1_1_1:{img:'M1_1_1',name:'abc',reward:500,freq:'common'},
      L1_1_2:{img:'M1_1_2',name:'abc',reward:750,freq:'rare'},
      L1_1_3:{img:'M1_1_3',name:'abc',reward:1000,freq:'ultrarare'},
      L2_1_1:{img:'M2_1_1',name:'abc',reward:60,freq:'common'},
      L2_1_2:{img:'M2_1_2',name:'abc',reward:70,freq:'rare'},
      L2_1_3:{img:'M2_1_3',name:'abc',reward:90,freq:'ultrarare'},
      L2_2_1:{img:'M2_2_1',name:'abc',reward:75,freq:'common'},
      L2_2_2:{img:'M2_2_2',name:'abc',reward:85,freq:'rare'},
      L2_2_3:{img:'M2_2_3',name:'abc',reward:95,freq:'ultrarare'},
      L3_1_1:{img:'M3_1_1',name:'abc',reward:60,freq:'common'},
      L3_1_2:{img:'M3_1_2',name:'abc',reward:70,freq:'rare'},
      L3_1_3:{img:'M3_1_3',name:'abc',reward:92,freq:'ultrarare'},
      L3_2_1:{img:'M3_2_1',name:'abc',reward:65,freq:'common'},
      L3_2_2:{img:'M3_2_2',name:'abc',reward:75,freq:'rare'},
      L3_2_3:{img:'M3_2_3',name:'abc',reward:94,freq:'ultrarare'},
      L3_3_1:{img:'M3_3_1',name:'abc',reward:75,freq:'common'},
      L3_3_2:{img:'M3_3_2',name:'abc',reward:85,freq:'rare'},
      L3_3_3:{img:'M3_3_3',name:'abc',reward:96,freq:'ultrarare'}
    },
    div:{
      L1_1_1:{img:'D1_1_1',name:'abc',reward:500,freq:'common'},
      L1_1_2:{img:'D1_1_2',name:'abc',reward:750,freq:'rare'},
      L1_1_3:{img:'D1_1_3',name:'abc',reward:1000,freq:'ultrarare'},
      L2_1_1:{img:'D2_1_1',name:'abc',reward:60,freq:'common'},
      L2_1_2:{img:'D2_1_2',name:'abc',reward:70,freq:'rare'},
      L2_1_3:{img:'D2_1_3',name:'abc',reward:90,freq:'ultrarare'},
      L2_2_1:{img:'D2_2_1',name:'abc',reward:75,freq:'common'},
      L2_2_2:{img:'D2_2_2',name:'abc',reward:85,freq:'rare'},
      L2_2_3:{img:'D2_2_3',name:'abc',reward:95,freq:'ultrarare'},
      L3_1_1:{img:'D3_1_1',name:'abc',reward:60,freq:'common'},
      L3_1_2:{img:'D3_1_2',name:'abc',reward:70,freq:'rare'},
      L3_1_3:{img:'D3_1_3',name:'abc',reward:92,freq:'ultrarare'},
      L3_2_1:{img:'D3_2_1',name:'abc',reward:65,freq:'common'},
      L3_2_2:{img:'D3_2_2',name:'abc',reward:75,freq:'rare'},
      L3_2_3:{img:'D3_2_3',name:'abc',reward:94,freq:'ultrarare'},
      L3_3_1:{img:'D3_3_1',name:'abc',reward:75,freq:'common'},
      L3_3_2:{img:'D3_3_2',name:'abc',reward:85,freq:'rare'},
      L3_3_3:{img:'D3_3_3',name:'abc',reward:96,freq:'ultrarare'}
    },
    ran:{
      queen:{img:'queen',name:'Queen Queenie',reward:100,freq:'ultrarare'}
    }
  }
}

export const creatureIds = ["L1_1_1","L1_1_2","L1_1_3","L2_1_1","L2_1_2","L2_1_3","L2_2_1","L2_2_2","L2_2_3","L3_1_1","L3_1_2","L3_1_3","L3_2_1","L3_2_2","L3_2_3","L3_3_1","L3_3_2","L3_3_3"];

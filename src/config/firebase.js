import firebase from 'firebase';

const firebaseConfig = {
  // Your Config Goes Here
  apiKey: "AIzaSyCuHrtSAPLC6CQeuv9WkaWcjksWFWly6TY",
    authDomain: "meetup-5ffb3.firebaseapp.com",
    databaseURL: "https://meetup-5ffb3-default-rtdb.firebaseio.com",
    projectId: "meetup-5ffb3",
    storageBucket: "meetup-5ffb3.appspot.com",
    messagingSenderId: "180793006827",
    appId: "1:180793006827:web:7665f36e7487bcf42e3cae"
};

const whatsApp = firebase.initializeApp(firebaseConfig);

const db = whatsApp.firestore();

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export default db;
export { provider, auth };

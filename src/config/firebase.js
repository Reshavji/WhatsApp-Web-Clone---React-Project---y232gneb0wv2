import firebase from 'firebase';

const firebaseConfig = {
  // Your Config Goes Here
 apiKey: "AIzaSyB7biHbRvIgCjtPP8GQkQz-0GPcDsB7AaY",
  authDomain: "whatsapp-5eab1.firebaseapp.com",
  projectId: "whatsapp-5eab1",
  storageBucket: "whatsapp-5eab1.appspot.com",
  messagingSenderId: "577791288691",
  appId: "1:577791288691:web:f841eb7e4c04e5cd591106"
};

const whatsApp = firebase.initializeApp(firebaseConfig);

const db = whatsApp.firestore();

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export default db;
export { provider, auth };

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB-ux59wDnclSoecBVhCVtA5EwDzC_Hb88",
    authDomain: "fir-2bda3.firebaseapp.com",
    databaseURL: "https://fir-2bda3-default-rtdb.firebaseio.com",
    projectId: "fir-2bda3",
    storageBucket: "fir-2bda3.appspot.com",
    messagingSenderId: "756310703219",
    appId: "1:756310703219:web:d1d926b2b5bdd27dae7e06"

};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  return new Promise((resolve, reject) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const name = result.user.displayName;
        const email = result.user.email;
        const profilePic = result.user.photoURL;

        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("profilePic", profilePic);

        resolve(true);
      })
      .catch((error) => {
        console.log(error);
        reject(error); 
      });
  });
};

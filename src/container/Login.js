import React, { useRef} from "react";
import whatsAppLogo from "../images/whatsapp-symbol.svg";
import GoogleIcon from "../images/google-icon.svg";
import { auth, provider } from "../config/firebase";
import "./Login.css";
import Animation from "./Animation";

const Login = () => {
  const containerRef = useRef();

  const signInWithGoogle = () => {
    auth
      .signInWithPopup(provider)
      .then((res) => res)
      .catch((err) => alert(err.message));
  };

  return (
    <div className="login" id="login">
      <Animation />
      <div ref={containerRef} className="login__container">
        <img src={whatsAppLogo} alt="WhatsAppLogo" />
        <h1>Sign In To WhatsApp</h1>
        <button onClick={signInWithGoogle} className="login__googleBtn">
          <img src={GoogleIcon} alt="Google Icon" className="login__google" />
          <span>Sign in with Google</span>
        </button>
        </div>
    </div>
  );
};

export default Login;

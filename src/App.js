import { React, useState } from 'react';
import Home from './Components/Home';
import {signInWithGoogle} from "./Components/firebase";
import ChatInterface from './Components/ChatInterface';
import './App.css';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const handleGoogleSignIn = async () => {
    try {
      const success = await signInWithGoogle();
      if (success) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    } catch (error) {
      console.log(error);
      setAuthenticated(false);
    }
  };

  return (
    <>
      {authenticated ? <ChatInterface /> : <Home handleGoogleSignIn={handleGoogleSignIn} />}
    </>
  );
}

export default App;

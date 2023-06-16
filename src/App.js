import { React, useState } from 'react';
import Home from './Components/Home';
import ChatInterface from './Components/ChatInterface';
import './App.css';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  const handleGoogleSignIn = () => {
    // Simulating Google Sign-In success
   // Replace this with your actual Google Sign-In logic
   const loginSuccess = true;
    if (loginSuccess) {
      setAuthenticated(true);  
    } else {
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

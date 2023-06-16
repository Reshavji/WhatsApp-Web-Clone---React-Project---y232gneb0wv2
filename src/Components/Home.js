import Animation from "./Animation";

const Home = ({ handleGoogleSignIn }) => {
  return (
    <div className="container">
      <Animation />
      <div id="box">
        <img id="logo" src="https://static.vecteezy.com/system/resources/previews/018/930/746/non_2x/whatsapp-logo-whatsapp-icon-whatsapp-transparent-free-png.png" alt="whatsapp" />
        <button type="button" className="login-with-google-btn" onClick={handleGoogleSignIn}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Home;

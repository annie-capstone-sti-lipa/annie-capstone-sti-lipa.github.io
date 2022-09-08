import { useEffect, useState } from "react";
import "./login.scss";

function LoginFrame() {
  const [isLogin, setIsLogin] = useState(true);

  const [signupUsername, setSignupUsername] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupPassword1, setSignupPassword1] = useState("");

  const [signupError, setSignupError] = useState("");

  useEffect(() => {
    if (document.querySelector(".error-text") !== null) {
      document.querySelector(".error-text")!.innerHTML = signupError;
    }
  }, [signupError]);

  if (isLogin) {
    return (
      <div id="login" key={Math.random()}>
        <div className="login-form-container">
          <div className="login-form">
            <div className="login-title">Login</div>
            <small>username</small>
            <input type="text" className="input-field" />
            <small>password</small>
            <input type="password" className="input-field" />
            <div className="submit-button">Login</div>
            <div>Don't have an account yet? </div>
            <div className="signup-cta" onClick={() => setIsLogin(false)}>
              Sign up.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="signup">
      <div className="login-form-container">
        <div className="login-form">
          <div className="login-title">Sign up</div>
          <small>username</small>
          <input
            type="text"
            className="input-field"
            onChange={(event) => setSignupUsername(event.target.value)}
          />
          <small>password</small>
          <input
            type="password"
            className="input-field"
            onChange={(event) => setSignupPassword(event.target.value)}
          />
          <small>confirm password</small>
          <input
            type="password"
            className="input-field"
            onChange={(event) => setSignupPassword1(event.target.value)}
          />
          <small className="error-text"></small>
          <div
            className="submit-button"
            onClick={() => {
              setSignupError("");
              if (signupPassword !== signupPassword1) {
                setSignupError("Passwords do not match.");
              }
            }}
          >
            Sign up
          </div>
          <div>Already have an account?</div>
          <div className="signup-cta" onClick={() => setIsLogin(true)}>
            Login.
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginFrame;

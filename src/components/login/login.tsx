import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authenticationHelper } from "../../App";
import AlertHelper from "../../helpers/alert-helper";
import AnnieAPI from "../../helpers/annie-api";
import Helpers from "../../helpers/helpers";
import { setLoading, setSchedules } from "../../redux/reducers/anime-schedules";
import { login } from "../../redux/reducers/login";
import "./login.scss";

function LoginFrame() {
  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState(true);

  const [formKey, setFormKey] = useState(1);

  const [loginEmail, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [SignupEmail, setSignupUsername] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupPassword1, setSignupPassword1] = useState("");

  const [signupError, setSignupError] = useState("");
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    if (document.querySelector(".error-text") !== null) {
      document.querySelector(".error-text")!.innerHTML = signupError;
    }
  }, [signupError]);

  useEffect(() => {
    if (document.querySelector(".error-text") !== null) {
      document.querySelector(".error-text")!.innerHTML = loginError;
    }
  }, [loginError]);

  async function preloadData() {
    dispatch(setLoading(true));
    await AnnieAPI.getWeekSchedule().then((schedules) => {
      dispatch(setSchedules(schedules));
      dispatch(setLoading(false));
    });
  }

  if (isLogin) {
    return (
      <div id="login" key={formKey}>
        <div className="login-form-container">
          <div className="login-form">
            <div className="login-title">Login</div>
            <small>email</small>
            <input
              type="email"
              defaultValue={loginEmail}
              className="input-field"
              onChange={(event) => setLoginUsername(event.target.value)}
            />
            <small>password</small>
            <input
              type="password"
              defaultValue={loginPassword}
              className="input-field"
              onChange={(event) => setLoginPassword(event.target.value)}
            />
            <small className="error-text"></small>
            <div
              className="submit-button"
              onClick={() => {
                setLoginError("");
                if (false) {
                  setLoginError("sample login error");
                }

                if (loginError === "") {
                  let loading = AlertHelper.showLoading("Logging in");
                  authenticationHelper
                    .login(loginEmail, loginPassword)
                    .then(() => {
                      preloadData();
                      dispatch(login(true));
                      loading.close();
                    })
                    .catch((e) => {
                      AlertHelper.errorToast(Helpers.getFirebaseError(e));
                    });
                }
              }}
            >
              Login
            </div>
            <div
              className="signup-cta"
              onClick={() =>
                AlertHelper.textInputAlert(
                  "Please Enter your email",
                  async (email) => {
                    try {
                      let loading = AlertHelper.showLoading("Processing");
                      await authenticationHelper
                        .resetPassword(email)
                        .then(() => loading.close());
                      AlertHelper.successAlert(
                        "We've sent the reset password link to your email."
                      );
                    } catch (e) {
                      AlertHelper.errorToast(Helpers.getFirebaseError(e));
                    }
                  }
                )
              }
            >
              Forgot Password
            </div>
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
          <small>email</small>
          <input
            type="email"
            defaultValue={SignupEmail}
            className="input-field"
            onChange={(event) => setSignupUsername(event.target.value)}
          />
          <small>password</small>
          <input
            type="password"
            defaultValue={signupPassword}
            className="input-field"
            onChange={(event) => setSignupPassword(event.target.value)}
          />
          <small>confirm password</small>
          <input
            type="password"
            defaultValue={signupPassword1}
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

              if (signupError === "") {
                let loading = AlertHelper.showLoading("Signing Up.");
                authenticationHelper
                  .signup(SignupEmail, signupPassword)
                  .then((response) => {
                    loading.close();
                  });
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

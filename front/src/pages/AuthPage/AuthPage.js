import { useEffect, useState } from "react";
import "./AuthPage.css";
import FormInput from "../../components/FormInput/FormInput";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { simpleFetch } from "../../utils/utilsBundle";
import { urls, RegisterInputs, LoginInputs } from "../../utils/utilsBundle";
import { isAuthenticated } from "../../states/atoms";

const AuthPage = () => {
  const initialValue = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [values, setValues] = useState(initialValue);
  const [registerMode, setRegisterMode] = useState(false);
  const [auth, setAuth] = useRecoilState(isAuthenticated);

  let navigate = useNavigate();

  const handleRegister = async (e) => {
    const registerParams = {
      username: values.username,
      email: values.email,
      password1: values.password,
      password2: values.confirmPassword,
    };

    const registerRequest = await simpleFetch(
      urls.registerPath,
      "POST",
      JSON.stringify(registerParams),
      ""
    );

    e.preventDefault();
    registerRequest();
    setRegisterMode(false);
    setValues(initialValue);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginParams = {
      username: values.username,
      email: values.email,
      password: values.password,
    };

    const loginRequest = await simpleFetch(
      urls.loginPath,
      "POST",
      JSON.stringify(loginParams),
      ""
    );

    const { access, refresh, user } = loginRequest;
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
    localStorage.setItem("userInfo", JSON.stringify(user));
    setAuth(true);
    console.log("login success");
    //return navigate("/chat");
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="app">
      {registerMode ? (
        <form className="frm" onSubmit={handleRegister}>
          <h1 className="title">Register</h1>
          {RegisterInputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
          <button className="auth-btn" onClick={handleRegister}>
            Submit
          </button>
        </form>
      ) : (
        <form>
          <h1>Login</h1>
          {LoginInputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
          <button className="auth-btn" onClick={handleLogin}>
            Sign in
          </button>
          <button
            className="auth-btn"
            onClick={() => {
              setRegisterMode(true);
            }}
          >
            Sign up
          </button>
        </form>
      )}
    </div>
  );
};

export default AuthPage;

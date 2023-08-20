import { useEffect, useState } from "react";
import "./AuthPage.css";
import FormInput from "../../components/FormInput/FormInput";
import { redirect, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authTokens } from "../../states/atoms";
const AuthPage = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  let navigate = useNavigate();

  // const [tokens, setTokens] = useState(() =>
  //   localStorage.getItem("authTokens")
  //     ? JSON.parse(localStorage.getItem("authTokens"))
  //     : null
  // );

  const [tokens, setTokens] = useRecoilState(authTokens);

  const [registerMode, setRegisterMode] = useState(false);

  const RegisterInputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 5,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
  ];

  const LoginInputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      label: "Username",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
      required: true,
    },
  ];

  const RegRequest = async () => {
    let response = await fetch(
      "http://127.0.0.1:8000/dj-rest-auth/registration/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: values.username,
          email: values.email,
          password1: values.password,
          password2: values.confirmPassword,
        }),
      }
    );

    let data = await response.json();
    console.log("res data: ", data);

    if (response.status === 200) {
      // setAuthTokens(data)
      // setUser(jwt_decode(data.access))
      // localStorage.setItem('authTokens', JSON.stringify(data))
      console.log("register success");
    }
  };

  const LoginRequest = async () => {
    let response = await fetch("http://127.0.0.1:8000/dj-rest-auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: values.username,
        email: values.email,
        password: values.password,
      }),
    });

    let data = await response.json();
    console.log("res data: ", data);

    if (response.status === 200) {
      localStorage.setItem("authTokens", JSON.stringify(data));
      setTokens(data);
      console.log("login success");
      return navigate("/chat");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    RegRequest();
    setRegisterMode(false);
    setValues({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    LoginRequest();
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="app">
      {registerMode ? (
        <form onSubmit={handleRegister}>
          <h1>Register</h1>
          {RegisterInputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
          <button>Submit</button>
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

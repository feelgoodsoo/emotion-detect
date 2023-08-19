import React, { useEffect, useState } from "react";
import Nav from "./components/Navbar/Nav";
import "./App.css";
import { loadModels } from "./api/faceApi";
import { createFaLibrary } from "./utils/icons";
import { Route, redirect, Routes } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { authTokens } from "./states/atoms";
import AuthPage from "./pages/AuthPage/AuthPage";
createFaLibrary();
loadModels();
function App() {
  let [tokens, setTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );

  const updateToken = async () => {
    let response = await fetch(
      "http://127.0.0.1:8000/dj-rest-auth/token/refresh/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: authTokens?.refresh }),
      }
    );

    let data = await response.json();

    if (response.status === 200) {
      setTokens(data);
      localStorage.setItem("authTokens", JSON.stringify(data));
    }
  };

  useEffect(() => {
    if (tokens) {
      let fourMinutes = 1000 * 60 * 25;

      let interval = setInterval(() => {
        if (authTokens) {
          updateToken();
        }
      }, fourMinutes);
      return () => clearInterval(interval);
    }
  }, [tokens]);

  return (
    <>
      {tokens ? (
        <Nav />
      ) : (
        <Routes>
          <Route path="/" element={<AuthPage />} />
        </Routes>
      )}
    </>
  );
}

export default App;

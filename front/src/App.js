import React from "react";
import Nav from "./components/Navbar/Nav";
import "./App.css";
import { loadModels } from "./api/faceApi";
import { createFaLibrary } from "./utils/icons";
import Router from "./Router";
import { isAuthenticated } from "./states/atoms";
import { useRecoilValue } from "recoil";

createFaLibrary();
loadModels();
function App() {
  const hasAuth = useRecoilValue(isAuthenticated);
  console.log("hasAuth: ", hasAuth);
  return (
    <>
      <Nav />
      <Router />
    </>
  );
}

export default App;

import React from "react";
import Nav from "./components/Navbar/Nav";
import "./App.css";
import { loadModels } from "./api/faceApi";
import { createFaLibrary } from "./utils/icons";
import Router from "./Router";

createFaLibrary();
loadModels();
function App() {
  return (
    <>
      <Nav />
      <Router />
    </>
  );
}

export default App;

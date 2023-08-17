import React from "react";
import Nav from "./components/Navbar/Nav";
import "./App.css";
import { loadModels } from "./api/faceApi";
import { createFaLibrary } from "./utils/icons";

createFaLibrary();
loadModels();
function App() {
  return (
    <>
      <Nav />
    </>
  );
}

export default App;

import React from "react";
import { BrowserRouter, NavLink, Routes, Route } from "react-router-dom";
import "./Nav.css";
import ContactPage from "./pages/ContactPage";
import BoardPage from "./pages/BoardPage";
import ChatPage from "./pages/ChatPage";
import HomePage from "./pages/HomePage";

function Nav() {
  return (
    <BrowserRouter>
      <nav className="topnav">
        <NavLink className="link" to="/contact">
          Contact
        </NavLink>
        <NavLink className="link" to="/Board">
          Board
        </NavLink>
        <NavLink className="link" to="/chat">
          Chat
        </NavLink>
        <NavLink className="link" to="/home">
          Home
        </NavLink>
      </nav>

      <Routes>
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/board" element={<BoardPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/chat" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Nav;

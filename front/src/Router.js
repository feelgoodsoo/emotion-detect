import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import ChatPage from "./pages/ChatPage";

export default function Router() {
  return (
    <BrowserRouter>
      <nav>
        <NavLink to="/chat">Chat</NavLink>
      </nav>

      <Routes>
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </BrowserRouter>
  );
}

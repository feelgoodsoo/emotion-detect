import React, { useEffect } from "react";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import "./Nav.css";
import ContactPage from "../../pages/ContactPage/ContactPage";
import BoardPage from "../../pages/BoardPage/BoardPage";
import ChatPage from "../../pages//ChatPage/ChatPage";
import HomePage from "../../pages/HomePage/HomePage";
import AuthPage from "../../pages/AuthPage/AuthPage";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  currentLocation,
  needDetectStop,
  autoPromt,
  faceImage,
  isCaptured,
} from "../../states/atoms";

function Nav() {
  const location = useLocation();
  const [currentLoc, setCurrentLoc] = useRecoilState(currentLocation);
  const [needStop, setNeedStop] = useRecoilState(needDetectStop);
  //const currentLocInAtom = useRecoilValue(currentLocation);
  const [advice, setAdvice] = useRecoilState(autoPromt);
  const [img, setImg] = useRecoilState(faceImage);
  const [capture, setCapture] = useRecoilState(isCaptured);

  useEffect(() => {
    setCurrentLoc(location.pathname);
    //console.log("currentLoc in Nav: ", currentLoc);
  }, [currentLoc, location]);

  return (
    <>
      <nav className="topnav">
        <Link
          className="link"
          to="/contact"
          onClick={() => {
            setNeedStop(true);
          }}
        >
          Contact
        </Link>
        <Link
          className="link"
          to="/board"
          onClick={() => {
            setNeedStop(true);
          }}
        >
          Board
        </Link>
        <Link
          className="link"
          to="/chat"
          onClick={() => {
            setNeedStop(true);
            setAdvice("");
            setImg("");
            setCapture(false);
          }}
        >
          Chat
        </Link>
        <Link
          className="link"
          to="/home"
          onClick={() => {
            setNeedStop(false);
          }}
        >
          Home
        </Link>
      </nav>

      <Routes>
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/board" element={<BoardPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default Nav;

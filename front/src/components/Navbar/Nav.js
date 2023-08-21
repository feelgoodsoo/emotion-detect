import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Nav.css";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  currentLocation,
  needDetectStop,
  autoPromt,
  faceImage,
  isCaptured,
} from "../../states/atoms";

function Nav() {
  const [currentLoc, setCurrentLoc] = useRecoilState(currentLocation);
  const [needStop, setNeedStop] = useRecoilState(needDetectStop);
  const [advice, setAdvice] = useRecoilState(autoPromt);
  const [img, setImg] = useRecoilState(faceImage);
  const [capture, setCapture] = useRecoilState(isCaptured);

  return (
    <>
      <nav className="topnav">
        <Link
          className="link"
          to="/user"
          onClick={() => {
            setNeedStop(true);
          }}
        >
          User
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
    </>
  );
}

export default Nav;

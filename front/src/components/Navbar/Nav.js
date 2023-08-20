import React, { useEffect } from "react";
import {
  Link,
  Routes,
  Route,
  useLocation,
  redirect,
  useNavigate,
  Navigate,
} from "react-router-dom";
import "./Nav.css";
import UserPage from "../../pages/UserPage/UserPage";
import BoardHomePage from "../../pages/BoardPage/BoardHomePage/BoardHomePage";
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
  authTokens,
} from "../../states/atoms";
import BoardCreatePage from "../../pages/BoardPage/BoardCreatePage/BoardCreatePage";
import BoardMyPostPage from "../../pages/BoardPage/BoardMyPostPage/BoardMyPostPage";
import BoardDetailPage from "../../pages/BoardPage/BoardDetailPage/BoardDetailPage";
import BoardUpdatePage from "../../pages/BoardPage/BoardUpdatePage/BoardUpdatePage";
import BoardSearchPage from "../../pages/BoardPage/BoardSearchPage/BoardSearchPage";

function Nav() {
  const location = useLocation();
  const [currentLoc, setCurrentLoc] = useRecoilState(currentLocation);
  const [needStop, setNeedStop] = useRecoilState(needDetectStop);
  //const currentLocInAtom = useRecoilValue(currentLocation);
  const [advice, setAdvice] = useRecoilState(autoPromt);
  const [img, setImg] = useRecoilState(faceImage);
  const [capture, setCapture] = useRecoilState(isCaptured);

  const token = useRecoilValue(authTokens);
  let navigate = useNavigate();

  useEffect(() => {
    setCurrentLoc(location.pathname);
    //console.log("currentLoc in Nav: ", currentLoc);
  }, [currentLoc, location]);

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

      <Routes>
        <Route path="/" element={<AuthPage />}></Route>
        <Route
          path="/user"
          element={!token ? <Navigate to="/" /> : <UserPage />}
        />
        <Route
          path="/board"
          element={!token ? <Navigate to="/" /> : <BoardHomePage />}
        />
        <Route
          path="/board/post"
          element={!token ? <Navigate to="/" /> : <BoardCreatePage />}
        />
        <Route
          path="/board/mypost"
          element={!token ? <Navigate to="/" /> : <BoardMyPostPage />}
        />

        <Route
          path="/chat"
          element={!token ? <Navigate to="/" /> : <ChatPage />}
        />
        <Route
          path="/home"
          element={!token ? <Navigate to="/" /> : <HomePage />}
        />
        <Route
          path="/board/:id"
          element={!token ? <Navigate to="/" /> : <BoardDetailPage />}
        />
        <Route
          path="/update/:id"
          element={!token ? <Navigate to="/" /> : <BoardUpdatePage />}
        />
        <Route
          path="/update/:id"
          element={!token ? <Navigate to="/" /> : <BoardUpdatePage />}
        />
        <Route
          path="/search"
          element={!token ? <Navigate to="/" /> : <BoardSearchPage />}
        />
      </Routes>
    </>
  );
}

export default Nav;

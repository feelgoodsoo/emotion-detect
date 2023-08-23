import React, { useEffect } from "react";
import { Navigate, Routes, Route, useNavigate } from "react-router-dom";
import UserPage from "./pages/UserPage/UserPage";
import BoardHomePage from "./pages/BoardPage/BoardHomePage/BoardHomePage";
import ChatPage from "./pages//ChatPage/ChatPage";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import BoardCreatePage from "./pages/BoardPage/BoardCreatePage/BoardCreatePage";
import BoardMyPostPage from "./pages/BoardPage/BoardMyPostPage/BoardMyPostPage";
import BoardUpdatePage from "./pages/BoardPage/BoardUpdatePage/BoardUpdatePage";
import BoardDetailPage from "./pages/BoardPage/BoardDetailPage/BoardDetailPage";
import BoardSearchPage from "./pages/BoardPage/BoardSearchPage/BoardSearchPage";
import { authToken, isAuthenticated } from "./states/atoms";
import { useRecoilValue, useRecoilState } from "recoil";
import { simpleFetch, urls, logoutHandler } from "./utils/utilsBundle";

function Router() {
  //const hasAuth = useRecoilValue(isAuthenticated);
  const [accessToken, setAccessToken] = useRecoilState(authToken);
  const [auth, setAuth] = useRecoilState(isAuthenticated);
  const refershToken = localStorage.getItem("refreshToken");
  const navigate = useNavigate();

  const updateToken2 = async () => {
    try {
      let response = await simpleFetch(
        urls.tokenRefreshPath,
        "POST",
        JSON.stringify({ refresh: refershToken }),
        ""
      );
      console.log("refresh token response: ", response);
      if (response.access) {
        localStorage.setItem("accessToken", response.access);
      } else {
        // 만약 리프레시 토큰도 만료되었다면 Logout 처리
        logoutHandler();
        setAuth(false);
        navigate("/");
      }
    } catch (e) {
      console.error(e);
      alert("update Token중 에러가 발생하였습니다");
    }
  };

  useEffect(() => {
    if (auth) {
      let twofiveMin = 1000 * 60 * 25; // * 25;

      let interval = setInterval(() => {
        updateToken2();
      }, twofiveMin);
      return () => {
        clearInterval(interval);
        console.log("request for refresh token is executed [in router]");
      };
    }
  }, [auth]);

  return (
    <>
      <Routes>
        <Route path="/" element={<AuthPage />}></Route>
        <Route
          path="/user"
          element={!accessToken ? <Navigate to="/" /> : <UserPage />}
        />
        <Route
          path="/board"
          element={!accessToken ? <Navigate to="/" /> : <BoardHomePage />}
        />
        <Route
          path="/board/post"
          element={!accessToken ? <Navigate to="/" /> : <BoardCreatePage />}
        />
        <Route
          path="/board/mypost"
          element={!accessToken ? <Navigate to="/" /> : <BoardMyPostPage />}
        />

        <Route
          path="/chat"
          element={!accessToken ? <Navigate to="/" /> : <ChatPage />}
        />
        <Route
          path="/home"
          element={!accessToken ? <Navigate to="/" /> : <HomePage />}
        />
        <Route
          path="/board/:id"
          element={!accessToken ? <Navigate to="/" /> : <BoardDetailPage />}
        />
        <Route
          path="/update/:id"
          element={!accessToken ? <Navigate to="/" /> : <BoardUpdatePage />}
        />
        <Route
          path="/search"
          element={!accessToken ? <Navigate to="/" /> : <BoardSearchPage />}
        />
      </Routes>
    </>
  );
}

export default Router;

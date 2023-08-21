import React, { useEffect } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
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
import { isAuthenticated } from "./states/atoms";
import { useRecoilValue, useRecoilState } from "recoil";
import { simpleFetch, urls, logoutHandler } from "./utils/utilsBundle";

function Router() {
  const hasAuth = useRecoilValue(isAuthenticated);
  console.log("router ");

  const [auth, setAuth] = useRecoilState(isAuthenticated);
  const refershToken = localStorage.getItem("refreshToken");

  const updateToken2 = async () => {
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
          element={!hasAuth ? <Navigate to="/" /> : <UserPage />}
        />
        <Route
          path="/board"
          element={!hasAuth ? <Navigate to="/" /> : <BoardHomePage />}
        />
        <Route
          path="/board/post"
          element={!hasAuth ? <Navigate to="/" /> : <BoardCreatePage />}
        />
        <Route
          path="/board/mypost"
          element={!hasAuth ? <Navigate to="/" /> : <BoardMyPostPage />}
        />

        <Route
          path="/chat"
          element={!hasAuth ? <Navigate to="/" /> : <ChatPage />}
        />
        <Route
          path="/home"
          element={!hasAuth ? <Navigate to="/" /> : <HomePage />}
        />
        <Route
          path="/board/:id"
          element={!hasAuth ? <Navigate to="/" /> : <BoardDetailPage />}
        />
        <Route
          path="/update/:id"
          element={!hasAuth ? <Navigate to="/" /> : <BoardUpdatePage />}
        />
        <Route
          path="/search"
          element={!hasAuth ? <Navigate to="/" /> : <BoardSearchPage />}
        />
      </Routes>
    </>
  );
}

export default Router;

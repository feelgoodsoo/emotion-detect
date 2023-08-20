import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { keywordForSearch } from "../../../states/atoms";

function BoardHomePage() {
  const navigate = useNavigate();
  const userInfo = localStorage.getItem("authTokens");
  const parsedAccessToken = JSON.parse(userInfo).access;
  const [keyword, setKeyword] = useState("");
  const [board, setBoard] = useState([]);
  const [searchKeyword, setSearchKeyword] = useRecoilState(keywordForSearch);

  //console.log(parsedAccessToken);
  const getBoard = async () => {
    let response = await fetch(`http://127.0.0.1:8000/api/board/get/list/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${parsedAccessToken}`,
      },
    });

    let data = await response.json();
    //console.log("res data: ", data);

    if (response.status === 200) {
      console.log("fetch success");
      setBoard(data);
    }
  };

  useEffect(() => {
    getBoard();
    setSearchKeyword("");
  }, []);

  const search = async () => {
    setSearchKeyword(keyword);
    navigate("/search");
  };

  return (
    <>
      <input onChange={(e) => setKeyword(e.target.value)}></input>
      <button onClick={search}>search</button>
      <button onClick={() => navigate("/board/post")}>create</button>
      <button onClick={() => navigate("/board/mypost")}>myPost</button>
      <h1>post list</h1>
      <ol>
        {board.map((board) => (
          <li key={board.id}>
            <Link to={`/board/${board.id}`}>
              제목: {board.title} 작성자: {board.writer}
            </Link>
          </li>
        ))}
      </ol>
    </>
  );
}

export default BoardHomePage;

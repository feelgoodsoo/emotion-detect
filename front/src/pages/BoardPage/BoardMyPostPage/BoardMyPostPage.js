import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function BoardMyPostPage() {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("authTokens"));
  const [board, setBoard] = useState([]);

  const getBoard = async () => {
    let response = await fetch(
      `http://127.0.0.1:8000/api/board/get/bywriter/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.access}`,
        },
        body: JSON.stringify({
          writer: userInfo.user.username,
        }),
      }
    );
    let data = await response.json();
    console.log("res data: ", data);

    if (response.status === 200) {
      console.log("fetch success");
      setBoard(data);
    }
  };

  useEffect(() => {
    getBoard();
  }, []);

  return (
    <>
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

export default BoardMyPostPage;

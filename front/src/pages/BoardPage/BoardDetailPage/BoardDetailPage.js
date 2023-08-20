import React, { useEffect, useState } from "react";
import Board from "../../../components/Board/Board";
import { useNavigate, useParams } from "react-router-dom";

function BoardDetailPage() {
  const { id } = useParams();
  const [board, setBoard] = useState({});
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("authTokens"));

  const getBoard = async () => {
    let response = await fetch(`http://127.0.0.1:8000/api/board/get/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    });

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

  const deleteBoard = async () => {
    if (window.confirm("게시글 삭제할거야?")) {
      let response = await fetch(
        `http://127.0.0.1:8000/api/board/post/delete/${id}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.access}`,
          },
        }
      );
      let data = await response.json();
      console.log("res data: ", data);

      if (response.status === 200) {
        console.log("delete success");
        setBoard(data);
        navigate("/board");
      }
    }
  };

  const updateBoard = async () => {
    navigate("/update/" + id);
  };

  return (
    <>
      <h1>게시판 상세 보기</h1>
      <div>
        <Board
          id={board.id}
          title={board.title}
          content={board.content}
          writer={board.writer}
        />
        {board.writer === userInfo.user.username ? (
          <>
            (<button onClick={updateBoard}>수정</button>
            <button onClick={deleteBoard}>삭제</button>)
          </>
        ) : null}
      </div>
    </>
  );
}

export default BoardDetailPage;

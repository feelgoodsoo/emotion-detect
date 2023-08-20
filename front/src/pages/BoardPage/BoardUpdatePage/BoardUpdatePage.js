import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function BoardUpdatePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const userInfo = JSON.parse(localStorage.getItem("authTokens"));

  const [board, setBoard] = useState({
    id: 0,
    title: "",
    content: "",
    writer: "",
  });

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

  const updateBoard = async () => {
    const params = {
      id: `${board.id}`,
      title: `${board.title}`,
      content: `${board.content}`,
      writer: `${userInfo.user.username}`,
    };
    console.log("updated params: ", params);
    let response = await fetch(
      `http://127.0.0.1:8000/api/board/post/update/${board.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.access}`,
        },
        body: JSON.stringify(params),
      }
    );

    let data = await response.json();
    console.log("res data: ", data);

    if (response.status === 200) {
      console.log("update success");
      setBoard("");
      alert("수정되었다!");
      navigate(`/board/${id}`);
    }
  };

  const { title, content } = board;

  useEffect(() => {
    getBoard();
  }, []);

  const onChange = (event) => {
    const { value, name } = event.target;
    setBoard({
      ...board,
      [name]: value,
    });
  };

  const backToDetail = () => {
    navigate(`/board/${id}`);
  };

  return (
    <div>
      <div>
        <span>제목</span>
        <input type="text" name="title" value={title} onChange={onChange} />
      </div>
      <br />
      <div>
        <span>내용</span>
        <textarea
          name="content"
          cols="30"
          rows="10"
          value={content}
          onChange={onChange}
        ></textarea>
      </div>
      <br />
      <button onClick={updateBoard}>수정</button>
      <button onClick={backToDetail}>취소</button>
    </div>
  );
}

export default BoardUpdatePage;

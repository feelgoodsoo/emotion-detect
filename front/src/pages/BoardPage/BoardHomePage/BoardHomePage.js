import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function BoardHomePage() {
  const navigte = useNavigate();

  let sample = [
    {
      id: "1",
      title: "test1",
      content: "content1",
      username: "heesoo",
    },
    {
      id: "2",
      title: "test2",
      content: "content2",
      username: "gosoo",
    },
    {
      id: "3",
      title: "test3",
      content: "content3",
      username: "hasoo",
    },
    {
      id: "4",
      title: "test4",
      content: "content4",
      username: "hyunsoo",
    },
    {
      id: "5",
      title: "test5",
      content: "content5",
      username: "goosoo",
    },
  ];
  return (
    <>
      <input></input>
      <button>search</button>
      <button onClick={() => navigte("/board/post")}>post</button>
      <button onClick={() => navigte("/board/mypost")}>myPost</button>
      <h1>post list</h1>
      <ol>
        {sample.map((board) => (
          <li key={board.id}>
            <Link to={`/board/${board.id}`}>
              제목: {board.title} 작성자: {board.username}{" "}
            </Link>
          </li>
        ))}
      </ol>
    </>
  );
}

export default BoardHomePage;

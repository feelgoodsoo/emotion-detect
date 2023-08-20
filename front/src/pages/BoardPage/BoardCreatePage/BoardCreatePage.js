import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function BoardCreatePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("authTokens"));

  const sendData = async () => {
    try {
      const params = {
        title: `${title}`,
        content: `${content}`,
        writer: `${userInfo.user.username}`,
      };

      let response = await fetch(
        "http://127.0.0.1:8000/api/board/post/create/",
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
        navigate("/board");
      }
    } catch (e) {
      console.error(e);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("title: ", title);
    console.log("postContent: ", content);
    setTitle("");
    setContent("");
    sendData();
  };

  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button onClick={handleSubmit}>작성</button>
    </div>
  );
}

export default BoardCreatePage;

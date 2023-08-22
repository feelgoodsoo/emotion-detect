import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { Button, Box } from "@mui/material";
import { simpleFetch, urls } from "../../../utils/utilsBundle";

function BoardCreatePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  //console.log(userInfo);
  const accessToken = localStorage.getItem("accessToken");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const sendData = async () => {
    try {
      const params = {
        title: `${title}`,
        content: `${content}`,
        writer: `${userInfo.username}`,
      };

      let data = await simpleFetch(
        urls.boardCreatePath,
        "POST",
        JSON.stringify(params),
        accessToken
      );
      if (data) {
        navigate("/board");
      }
    } catch (e) {
      console.error(e);
      alert("글 작성 처리 중에 에러가 발생하였습니다");
    }
  };

  const handleSubmit = (e) => {
    if (window.confirm("글을 작성하시겠습니까?")) {
      e.preventDefault();
      // console.log("title: ", title);
      // console.log("postContent: ", content);
      sendData();
      setTitle("");
      setContent("");
    }
  };

  return (
    <div className="create-page-container">
      <div className="title-container">
        <Box textAlign="center">
          <TextField
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력해주세요."
            sx={{
              mb: 3,
              mt: 4,
              width: "80%",
            }}
          />
        </Box>
      </div>
      <div className="content-container">
        <Box textAlign="center">
          <TextField
            multiline
            rows={20}
            onChange={(e) => setContent(e.target.value)}
            sx={{
              mb: 3,
              width: "80%",
            }}
            placeholder="내용을 입력해주세요."
          />
        </Box>
        <Box textAlign="center">
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{ mb: 3, width: "15%" }}
          >
            send
          </Button>
        </Box>
      </div>
    </div>
  );
}

export default BoardCreatePage;

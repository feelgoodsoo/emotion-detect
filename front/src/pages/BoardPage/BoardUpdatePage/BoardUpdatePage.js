import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextField } from "@mui/material";
import { Button, Box } from "@mui/material";
import {
  accessToken,
  simpleFetch,
  urls,
  userInfo,
} from "../../../utils/utilsBundle";

function BoardUpdatePage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [board, setBoard] = useState({
    id: 0,
    title: "",
    content: "",
    writer: "",
  });

  const getBoard = async () => {
    let data = await simpleFetch(
      urls.boardGetByIdPath + `${id}/`,
      "GET",
      "",
      accessToken
    );
    if (data) {
      setBoard(data);
    }
  };

  const updateBoard = async () => {
    if (window.confirm("게시글을 수정하겠습니까?")) {
      const params = {
        id: `${board.id}`,
        title: `${board.title}`,
        content: `${board.content}`,
        writer: `${userInfo.username}`,
      };

      let data = await simpleFetch(
        urls.boardUpdateByIdPath + `${board.id}`,
        "POST",
        JSON.stringify(params),
        accessToken
      );
      if (data) {
        alert("수정되었습니다");
        navigate(`/board/${id}`);
      }
    }
  };

  const { title, content } = board;

  useEffect(() => {
    getBoard();
  }, []);

  const onChange = (event) => {
    event.preventDefault();
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
    <>
      <Box textAlign="center">
        <TextField
          name="title"
          onChange={onChange}
          multiline
          defaultValue={title}
          sx={{
            mb: 3,
            mt: 4,
            width: "80%",
          }}
        />
      </Box>

      <div className="content-container">
        <Box textAlign="center">
          <TextField
            name="content"
            onChange={onChange}
            multiline
            rows={20}
            defaultValue={content}
            sx={{
              mb: 3,
              width: "80%",
            }}
          />
        </Box>
        <Box textAlign="center">
          <Button
            onClick={updateBoard}
            variant="contained"
            sx={{ mb: 3, width: "15%" }}
          >
            send
          </Button>

          <Button
            onClick={backToDetail}
            variant="contained"
            sx={{ ml: 3, mb: 3, width: "15%" }}
          >
            cancel
          </Button>
        </Box>
      </div>
    </>
  );
}

export default BoardUpdatePage;

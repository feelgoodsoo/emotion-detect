import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextField } from "@mui/material";
import { Button, Box } from "@mui/material";
import { simpleFetch, urls } from "../../../utils/utilsBundle";

function BoardUpdatePage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const accessToken = localStorage.getItem("accessToken");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const [board, setBoard] = useState({
    id: 0,
    title: "",
    content: "",
    writer: "",
  });

  const getBoard = async () => {
    try {
      let data = await simpleFetch(
        urls.boardGetByIdPath + `${id}/`,
        "GET",
        "",
        accessToken
      );
      if (data) {
        setBoard(data);
      }
    } catch (e) {
      alert("게시글을 가져오는 도중 에러가 발생하였습니다");
      console.error(e);
    }
  };

  const updateBoard = async () => {
    try {
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
    } catch (e) {
      console.error(e);
      alert("게시글을 업데이트 하는 도중 에러가 발생하였습니다");
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

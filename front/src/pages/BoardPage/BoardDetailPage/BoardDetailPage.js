import React, { useEffect, useState } from "react";
import Board from "../../../components/Board/Board";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Box } from "@mui/material";
import { simpleFetch, urls } from "../../../utils/utilsBundle";
import { accessToken, userInfo } from "../../../utils/utilsBundle";
function BoardDetailPage() {
  const { id } = useParams();
  const [board, setBoard] = useState({});
  const navigate = useNavigate();

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

  useEffect(() => {
    getBoard();
  }, []);

  const deleteBoard = async () => {
    if (window.confirm("게시글을 삭제하시겠습니까?")) {
      let data = await simpleFetch(
        urls.boardDeletePath + `${id}/`,
        "POST",
        "",
        accessToken
      );
      if (data) {
        alert("게시글이 삭제되었습니다");
        navigate("/board");
      }
    }
  };

  const updateBoard = async () => {
    navigate("/update/" + id);
  };

  return (
    <>
      <div style={{ marginTop: "50px" }}>
        <Board
          id={board.id}
          title={board.title}
          content={board.content}
          writer={board.writer}
          time_stamp={board.time_stamp}
        />
        {board.writer === userInfo.username ? (
          <>
            <Box textAlign="center">
              <Button
                onClick={updateBoard}
                variant="contained"
                sx={{ mt: 3, mb: 3, width: "15%" }}
              >
                update
              </Button>

              <Button
                onClick={deleteBoard}
                variant="contained"
                sx={{ mt: 3, ml: 3, mb: 3, width: "15%" }}
              >
                delete
              </Button>
            </Box>
            {/* <button onClick={updateBoard}>수정</button>
            <button onClick={deleteBoard}>삭제</button> */}
          </>
        ) : null}
      </div>
    </>
  );
}

export default BoardDetailPage;

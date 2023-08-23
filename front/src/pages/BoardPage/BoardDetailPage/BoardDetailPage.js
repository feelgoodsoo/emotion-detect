import React, { useEffect, useState } from "react";
import Board from "../../../components/Board/Board";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Box, TextField } from "@mui/material";
import { simpleFetch, urls } from "../../../utils/utilsBundle";
import Comment from "../../../components/Comment/Comment";

function BoardDetailPage() {
  const { id } = useParams(); // boardId
  const [board, setBoard] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const accessToken = localStorage.getItem("accessToken");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const navigate = useNavigate();

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
      console.error(e);
      alert("게시글을 가져오는 도중 에러가 발생하였습니다");
    }
  };

  //console.log("new comment: ", newComment);
  const getComments = async () => {
    try {
      let data = await simpleFetch(
        urls.commentListPath + `${id}/`,
        "GET",
        "",
        accessToken
      );
      if (data) {
        setComments(data);
      }
    } catch (e) {
      console.error(e);
      alert("댓글을 가져오는 도중 에러가 발생하였습니다");
    }
  };

  useEffect(() => {
    getBoard();
    getComments();
  }, []);

  const deleteBoard = async () => {
    try {
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
    } catch (e) {
      console.error(e);
      alert("게시글을 삭제하는 도중 에러가 발생하였습니다");
    }
  };

  const updateBoard = async () => {
    navigate("/update/" + id);
  };

  const addComment = async () => {
    const params = {
      commenter: userInfo.username,
      comment: newComment,
      board_id: id,
    };
    try {
      if (window.confirm("댓글을 추가하시겠습니까?")) {
        let data = await simpleFetch(
          urls.commentCreatePath,
          "POST",
          JSON.stringify(params),
          accessToken
        );
        if (data) {
          alert("댓글이 추가되었습니다");
          setNewComment("");
          navigate(`/board/`);
        }
      }
    } catch (e) {
      console.error(e);
      alert("에러가 발생하였습니다");
    }
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
          </>
        ) : null}
        <div style={{ marginBottom: "30px" }}></div>
        <Comment
          onChange={(e) => {
            setNewComment(e.target.value);
          }}
          onClick={addComment}
          comments={comments}
        />
      </div>
    </>
  );
}

export default BoardDetailPage;

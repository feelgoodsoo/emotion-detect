import React from "react";
import { Box, Button, TextField } from "@mui/material";
function Comment({ onChange, onClick, comments }) {
  return (
    <>
      <Box textAlign="center">
        <TextField
          multiline
          placeholder="댓글을 입력해주세요"
          onChange={onChange}
          sx={{
            mb: 3,
            width: "50%",
          }}
        />
        <Button
          onClick={onClick}
          variant="contained"
          sx={{ mb: 3, ml: 2, width: "10%", padding: "15px" }}
        >
          add
        </Button>
      </Box>
      <ul style={{ textAlign: "center" }}>
        {comments.map((comment) => (
          <li key={comment.id}>
            <div>{comment.comment}</div>
            <div>{comment.commenter}</div>
            <div style={{ marginBottom: "35px" }}>{comment.time_stamp}</div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Comment;

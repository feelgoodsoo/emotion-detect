import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { logoutHandler } from "../../utils/utilsBundle";
import { Box, Button } from "@mui/material";
function UserPage() {
  const accessToken = localStorage.getItem("accessToken");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const navigate = useNavigate();

  //console.log(typeof userInfo);

  const logOut = () => {
    logoutHandler();
    navigate("/");
  };

  return (
    <>
      <h2 style={{ textAlign: "center", marginTop: "30px" }}>
        username : {userInfo.username}
      </h2>
      <h2 style={{ textAlign: "center" }}>email :{userInfo.email}</h2>
      <Box textAlign="center">
        <Button
          onClick={logOut}
          variant="contained"
          sx={{ mt: 3, width: "15%" }}
        >
          logout
        </Button>
      </Box>
    </>
  );
}

export default UserPage;

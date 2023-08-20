import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { authTokens, test } from "../../states/atoms";
import { redirect, useNavigate } from "react-router-dom";

function UserPage() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useRecoilState(authTokens);

  console.log(typeof userInfo);
  //console.log(userInfo);

  const logoutHandler = async () => {
    console.log("logout button clicked");
    localStorage.removeItem("authTokens");
    setUserInfo(null);
    return navigate("/");
  };

  return (
    <>
      <div>username : {userInfo?.user?.username}</div>
      <div>email : {userInfo?.user?.email}</div>
      <button onClick={logoutHandler}>Logout</button>
    </>
  );
}

export default UserPage;

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { keywordForSearch } from "../../../states/atoms";

function BoardSearchPage() {
  const userInfo = JSON.parse(localStorage.getItem("authTokens"));
  const [searchData, setSearchData] = useState([]);
  const keyword = useRecoilValue(keywordForSearch);

  const search = async () => {
    let response = await fetch(
      `http://127.0.0.1:8000/api/board/get/searchByKeyword/${keyword}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.access}`,
        },
      }
    );

    let data = await response.json();
    //console.log("res data: ", data);

    if (response.status === 200) {
      console.log("search success");
      setSearchData(data);
    }
  };

  useEffect(() => {
    console.log("keyword: ", keyword);
    if (keyword) {
      search();
    }
  }, [keyword]);

  return (
    <>
      <h1>searched post list</h1>
      <ol>
        {searchData.map((board) => (
          <li key={board.id}>
            <Link to={`/board/${board.id}`}>
              제목: {board.title} 작성자: {board.writer}
            </Link>
          </li>
        ))}
      </ol>
    </>
  );
}

export default BoardSearchPage;

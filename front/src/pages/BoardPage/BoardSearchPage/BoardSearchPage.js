import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { keywordForSearch } from "../../../states/atoms";
import { simpleFetch, urls } from "../../../utils/utilsBundle";
import SimpleTable from "../../../components/SimpleTable/SimpleTable";

function BoardSearchPage() {
  const [searchData, setSearchData] = useState([]);
  const keyword = useRecoilValue(keywordForSearch);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const accessToken = localStorage.getItem("accessToken");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const search = async () => {
    try {
      let data = await simpleFetch(
        urls.boardSearchPath + `${keyword}/`,
        "GET",
        "",
        accessToken
      );
      if (data) {
        setSearchData(data);
      }
    } catch (e) {
      console.error(e);
      alert("검색한 게시글을 가져오는 도중 에러가 발생하였습니다");
    }
  };

  useEffect(() => {
    //console.log("keyword: ", keyword);
    if (keyword) {
      search();
    }
  }, [keyword]);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>searched posts</h1>
      <SimpleTable
        board={searchData}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
}

export default BoardSearchPage;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { keywordForSearch } from "../../../states/atoms";
import { TextField, Button, Box } from "@mui/material";
import { simpleFetch, urls } from "../../../utils/utilsBundle";
import { accessToken } from "../../../utils/utilsBundle";
import SimpleTable from "../../../components/SimpleTable/SimpleTable";

function BoardHomePage() {
  const navigate = useNavigate();
  //console.log("accessToken in BoardHome: ", accessToken);
  const [keyword, setKeyword] = useState("");
  const [board, setBoard] = useState([]);
  const [searchKeyword, setSearchKeyword] = useRecoilState(keywordForSearch);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getBoard = async () => {
    let data = await simpleFetch(urls.boardListPath, "GET", "", accessToken);
    if (data) {
      setBoard(data);
    }
  };

  useEffect(() => {
    getBoard();
    setSearchKeyword("");
  }, []);

  const search = async () => {
    if (keyword == "") {
      return;
    }
    setSearchKeyword(keyword);
    navigate("/search");
  };

  return (
    <>
      <Box textAlign="center" sx={{ mt: 5, mb: 5 }}>
        <TextField
          onChange={(e) => setKeyword(e.target.value)}
          size="small"
          sx={{
            width: "20%",
            mr: 2,
          }}
          placeholder="검색어를 입력하세요."
        />
        <Button
          onClick={search}
          variant="contained"
          sx={{ mb: 3, width: "10%" }}
        >
          search
        </Button>
        <Button
          onClick={() => navigate("/board/post")}
          variant="contained"
          sx={{ ml: 3, mb: 3, width: "10%" }}
        >
          create
        </Button>
        <Button
          onClick={() => navigate("/board/mypost")}
          variant="contained"
          sx={{ ml: 3, mb: 3, width: "10%" }}
        >
          myposts
        </Button>
      </Box>
      <SimpleTable
        board={board}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
}

export default BoardHomePage;

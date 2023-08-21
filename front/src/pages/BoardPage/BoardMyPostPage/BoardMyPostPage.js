import React, { useState, useEffect } from "react";
import { simpleFetch, urls } from "../../../utils/utilsBundle";
import { accessToken, userInfo } from "../../../utils/utilsBundle";
import SimpleTable from "../../../components/SimpleTable/SimpleTable";
function BoardMyPostPage() {
  const [board, setBoard] = useState([]);

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
    let data = await simpleFetch(
      urls.boardGetByWriterPath,
      "POST",
      JSON.stringify({
        writer: userInfo.username,
      }),
      accessToken
    );
    if (data) {
      setBoard(data);
    }
  };

  useEffect(() => {
    getBoard();
  }, []);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>my posts</h1>
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

export default BoardMyPostPage;

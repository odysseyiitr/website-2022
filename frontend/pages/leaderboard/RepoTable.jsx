import React, { useState } from "react";
import Pagination, { paginate } from "../../components/Pagination";
import Searchbar from "../../components/LeaBoardSearch";

const arr = Array.from(Array(110).keys());

const RepoTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginateArr = paginate(arr, currentPage, pageSize);

  return (
    <>
      <div className="leaderboard-cont">
        <div className="leaderboard-header">
          <h1 className="leaderboard-heading">Repos</h1>
          <Searchbar />
        </div>
        <div className="leaderboard-table-cont">
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th scope="col">Mentor NAME</th>
                <th scope="col">RANK</th>
                <th scope="col">contributions</th>
              </tr>
            </thead>
            <tbody>
              {paginateArr.map((ele) => {
                return (
                  <tr key={ele}>
                    <td>Mark</td>
                    <td>{ele}</td>
                    <td>mdo</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>{" "}
      <Pagination
        items={arr.length}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default RepoTable;

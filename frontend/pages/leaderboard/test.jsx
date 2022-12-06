import React, { useState } from "react";
import Pagination, { paginate } from "../../components/Pagination";
import Searchbar from "../../components/Searchbar";

const arr = Array.from(Array(106).keys());

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
                <th scope="col">NAME</th>
                <th scope="col">RANK</th>
                <th scope="col">EASY</th>
                <th scope="col">MED</th>
                <th scope="col">HARD</th>
                <th scope="col">POINTS</th>
              </tr>
            </thead>
            <tbody>
              {paginateArr.map((ele) => {
                return (
                  <tr key={ele}>
                    <td>Mark</td>
                    <td>{ele + 1}</td>
                    <td>{ele * 6}</td>
                    <td>{ele * 4}</td>
                    <td>{ele * 2}</td>
                    <td>{(ele + 1) * 100}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
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

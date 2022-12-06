import React, { useState } from "react";
import Pagination, { paginate } from "../../components/Pagination";
import Searchbar from "../../components/LeaBoardSearch";
import { useEffect } from "react";
import axios from "axios";

const LeaderBoardTable = () => {
  const [lbData, setLbData] = useState([]);
  const [fetchedPage, setFetchedPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginateArr, setPaginateArr] = useState([]);
  const [noDataMssg, setNoDataMssg] = useState("");
  const [display, setDisplay] = useState(true);
  const [srchArr, setSrchArr] = useState([]);

  const pageSize = 10;
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const func = async () => {
      try {
        const check = fetchedPage.filter((ele) => {
          return ele === currentPage;
        });
        if (check.length === 0) {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/leaderboard/${currentPage}`
          );

          const data = res.data.sort(function (a, b) {
            return b.points - a.points;
          });

          if (res.data.length === 0) {
            setNoDataMssg("no More Data to show");
            return;
          }

          if (lbData.length !== 0) data = [...lbData, ...data];
          for (let i = 0; i < data.length; i++)
            data[i] = { ...data[i], rank: i + 1 };
          setFetchedPage([...fetchedPage, currentPage]);
          setLbData(data);
        }
        setNoDataMssg("");
      } catch (err) {
        setNoDataMssg(err?.message || "Error in fetching data");
      }
    };
    if (display) {
      func();
      setPaginateArr(paginate(lbData, currentPage, pageSize));
    } else {
      setPaginateArr(paginate(srchArr, currentPage, pageSize));
    }
  }, [currentPage, lbData]);

  return (
    <>
      <div className="leaderboard-cont">
        <div className="leaderboard-header">
          <h1 className="leaderboard-heading">LEADERBOARD</h1>
          <Searchbar
            arr={lbData}
            setCurrentPage={setCurrentPage}
            setPaginateArr={setPaginateArr}
            setDisplay={setDisplay}
            setNoDataMssg={setNoDataMssg}
            setSrchArr={setSrchArr}
          />
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
              {noDataMssg === "" ? (
                paginateArr.map((ele, index) => {
                  return (
                    <tr key={`leaderboard${ele.username}`}>
                      <td>{ele.name}</td>
                      <td>{ele.rank}</td>
                      <td>{ele.easy}</td>
                      <td>{ele.medium}</td>
                      <td>{ele.hard}</td>
                      <td>{ele.points}</td>
                    </tr>
                  );
                })
              ) : (
                <tr className="no-data-mssg">
                  <td>{noDataMssg}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {display ? (
        <Pagination
          items={lbData.length}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={handlePageChange}
        />
      ) : (
        <Pagination
          items={srchArr.length}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default LeaderBoardTable;

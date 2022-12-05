import axios from "axios";
import { paginate } from "./Pagination";

const Searchbar = ({
  arr,
  setDisplay,
  setPaginateArr,
  setNoDataMssg,
  setCurrentPage,
  setSrchArr,
}) => {
  const handleSearch = async (e) => {
    const srch = e.target.value;
    try {
      setNoDataMssg("");
      if (srch !== "") {
        if (e.key === "Enter") {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get-search-leaderboard/?query=${srch}`
          );

          let data = res.data.sort(function (a, b) {
            return b.points - a.points;
          });
          if (data.length === 0) {
            setNoDataMssg("no results are found");
          }
          let newData = [];
          for (let i = 0; i < data.length; i++)
            newData.push({ ...data[i], rank: i + 1 });
          setSrchArr(newData);
          setPaginateArr(paginate(newData, 1, 10));
          setCurrentPage(1);
          setDisplay(false);
        }
      } else {
        setDisplay(true);
        if (arr.length === 0) {
          setNoDataMssg("no more data to show");
        }
        setPaginateArr(paginate(arr, 1, 10));
        setCurrentPage(1);
      }
    } catch (err) {
      setNoDataMssg(err?.message || "error ocurred while querying data");
    }
  };

  return (
    <div className="searchbar">
      <img src="/images/searchIcon.svg" className="searchIcon"></img>
      <input
        onKeyUp={(e) => {
          handleSearch(e);
        }}
        className="searchText"
        placeholder="SEARCH"
        style={{ backgroundColor: "transparent" }}
      ></input>
    </div>
  );
};

export default Searchbar;

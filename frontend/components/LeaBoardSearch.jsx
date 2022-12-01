import { useRef } from "react";

const Searchbar = ({ arr }) => {
  const srchRef = useRef();

  const handleSearch = (e) => {
    e.preventDefault();
    for (let i = 0; i < arr.length; i++)
      if (arr[i] === srchRef.current.value) {
        return;
      }
  };

  return (
    <form onSubmit={handleSearch} className="searchbar">
      <img src="/images/searchIcon.svg" className="searchIcon"></img>
      <input
        ref={srchRef}
        className="searchText"
        placeholder="SEARCH"
        style={{ backgroundColor: "transparent" }}
      ></input>
    </form>
  );
};

export default Searchbar;

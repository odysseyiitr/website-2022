const Searchbar = ({}) => {
  return (
    <div className="searchbar">
      <img src="/images/searchIcon.svg" className="searchIcon"></img>
      <input
        className="searchText"
        placeholder="SEARCH"
        style={{ backgroundColor: "transparent" }}
      ></input>
    </div>
  );
};

export default Searchbar;

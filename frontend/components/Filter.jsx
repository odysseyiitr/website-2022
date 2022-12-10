import React from "react";
import { useEffect, useState } from "react";

const Filter = ({ tagMap, updateTagMapCallback, count }) => {
  var screenwidth = window.innerWidth;
  var marginActiveFilter, marginInactiveFilter;
  if (screenwidth < 576) {
    marginInactiveFilter = "-2.25rem";
    marginActiveFilter = "-1.05rem";
  } else {
    marginInactiveFilter = "-5.5rem";
    marginActiveFilter = "-4.3rem";
  }
  const [margin, changeMargin] = useState(marginInactiveFilter);
  useEffect(() => {
    if (count != 0)
      //currently the when a filter is selected the drop down moves a little right
      changeMargin(marginActiveFilter);
    //so this was applied to change the css of the dropdown menu cause no better fix
    //came to mind the value of margin is changing but it not refected in inspect element
    else changeMargin(marginInactiveFilter);
    console.log(margin);
  }, [count]);
  return (
    <>
      <div className="filterDropDown">
        {count != 0 ? <span class="dot">{count}</span> : <></>}
        <div className="filter">
          <div>
            <p>Filter</p>
          </div>
          <div className="filterIcon">
            <img src="/images/filter_icon.svg" />
          </div>
        </div>
        <div className="filterMenu" style={{ marginLeft: margin }}>
          {tagMap &&
            Array.from(tagMap).map(([tag, value], index) => {
              return (
                <button
                  key={index}
                  className={tag}
                  style={{
                    backgroundColor: value ? "#E95F8D" : "transparent",
                  }}
                  onClick={() => {
                    updateTagMapCallback(tag);
                  }}
                >
                  <div>{tag}</div>
                </button>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Filter;

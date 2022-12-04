import React from "react";
import _ from "lodash";
import { useState } from "react";

export const paginate = (items, pageNumber, pageSize) => {
  const strtindex = (pageNumber - 1) * pageSize;
  return _(items).slice(strtindex).take(pageSize).value();
};

const Pagination = ({ items, pageSize, currentPage, onPageChange }) => {
  let pagecount = items / pageSize;
  if (items % pageSize === 0) pagecount++;
  if (Math.ceil(pagecount) <= 1) return null;
  const pages = _.range(1, pagecount + 1);

  const handleNext = () => {
    if (strI + 6 > pages.length) return;
    setStrI(strI + 5, strI + 10);
  };

  const handlePrev = () => {
    if (strI - 5 < 0) return;
    setStrI(strI - 5, strI);
  };

  const [strI, setStrI] = useState(0);

  return (
    <div className="pagination">
      {pages.length > 5 && (
        <button
          onClick={handlePrev}
          style={{ border: "none", fontSize: "large" }}
          className="page-btn"
        >
          &laquo;
        </button>
      )}
      {pages.slice(strI, strI + 5).map((page) => {
        return (
          <button
            className={currentPage === page ? "page-btn-active" : "page-btn"}
            key={page}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        );
      })}
      {pages.length > 5 && (
        <button
          style={{ border: "none", fontSize: "large" }}
          className="page-btn"
          onClick={handleNext}
        >
          &raquo;
        </button>
      )}
    </div>
  );
};

export default Pagination;

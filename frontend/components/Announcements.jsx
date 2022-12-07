import AnouncementCard from "./AnouncementCard";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import React, { useState } from "react";
const currentPage = 0;

const Announcement = ({ data }) => {
  var data = [{date:"abc", heading:"abc", description:"abc", time:"abc", venue:"abc", note:"abc", index_no:2},{date:"abc", heading:"abc", description:"abc", time:"abc", venue:"abc", note:"abc", index_no:1},{date:"abc", heading:"abc", description:"abc", time:"abc", venue:"abc", note:"abc", index_no:1},{date:"abc", heading:"abc", description:"abc", time:"abc", venue:"abc", note:"abc", index_no:1}] 
  const [ABC,setABC]=useState(false);
  var pages = Math.ceil(data.length/3);
  // var pages =5;
  var pagearray=[];
  for (let i=0; i< pages; i++){
    pagearray.push(i);
  }
  function page(x){
    if (x>currentPage){
      console.log(currentPage)
      var shift=x-currentPage;
      currentPage=x;
      setABC(current => !current)
      console.log(ABC)
    }
    else {
      console.log(currentPage)
        var shift=currentPage-x;
        currentPage=x;
        setABC(current => !current)
        console.log(ABC)
    }
  }
  function slideLeft() {
    var slider = document.getElementById("anouncementList");
    if (!slider) {
      return;
    }
    currentPage=(currentPage-1)%pages;
    setABC(current => !current);
    slider.scrollLeft =
      slider.scrollLeft -
      (document.getElementsByClassName("anouncementCard")[0].width + 35) * 3;
  }
  function slideRight() {
    var slider = document.getElementById("anouncementList");
    if (!slider) {
      return;
    }
    currentPage=(currentPage+1)%pages;
    setABC(current => !current);
    slider.scrollLeft =
      slider.scrollLeft +
      (document.getElementsByClassName("anouncementCard")[0].width + 35) * 3;
  }
  return (
    <div className="announcement">
      <h1>Announcement</h1>

      <div className="anouncebox">
        <MdChevronLeft
          onClick={() => slideLeft()}
          size={50}
          style={{
            marginTop: "220px",
          }}
        />
        <div className="anouncementList" id="anouncementList">
          {data.map((item, i) => {
            return (
              <AnouncementCard
                date={item.date}
                key={i}
                heading={item.title}
                description={item.description}
                venue={item.venue}
                time={item.time}
                note={item.note}
              />
            );
          })}
        </div>
        <MdChevronRight
          onClick={() => slideRight()}
          size={50}
          style={{
            marginTop: "220px",
          }}
        />
      </div>
      <div className="pagination" id="pagination">
          {pagearray.map((item, i) => {
            return (
              (currentPage === i) ? (<div className="selected" id="selected" onClick={() => page(i)}></div>) : (<div className="unselected" id="unselected" onClick={() => page(i)}></div>)
            );
            })}
      </div>        
    </div>
  );
};
export default Announcement;

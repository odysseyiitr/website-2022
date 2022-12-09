import AnouncementCard from "./AnouncementCard";
import React, { useState } from "react";
import { Carousel } from 'react-responsive-carousel';

const Announcement = ({ data }) => {
  var array=[];
  for(let i=0; i<data.length; i++) {
    if (i%3==0 && i!=0){
      array.push(subarr);
      var subarr=[];
      subarr.push(i);
    }
    else{
      subarr.push(i)
    }
  }
  return (
    <div className="announcement">
      <h1>Announcement</h1>

      <div className="anouncebox">
      <Carousel showArrows={true} showThumbs={false}>
        {array.map((page, i)=>{
          return (
            <div className="carouselBox">
            {page.map((item,j) => {
              return (<AnouncementCard
                date={data[item].date}
                index_no={item}
                heading={data[item].title}
                description={data[item].description}
                venue={data[item].venue}
                time={data[item].time}
                note={data[item].note}
              />)
            })}
            </div>
          )
        })}
      </Carousel>
    </div>
    </div>
  );
};
export default Announcement;

import AnouncementCard from "./AnouncementCard";
import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
const currentPage = 0;

const Announcement = ({ data }) => {
  var pages = Math.ceil(data.length/3);
  var array=[];
  var subarr=[];
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
  console.log(array)
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
                key={item}
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

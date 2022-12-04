import PropTypes from 'prop-types'
import React from 'react';

const AnouncementCard = ({ date, heading, description, time, venue, note, index_no }) => {
  var color; var image;
  if (index_no % 3 == 0) {
    image = "url(/_next/static/media/anouncementOrange.52eb991f.svg)";
    color = "#F39434";
  }
  else if (index_no % 3 == 1) {
    image = "url(/_next/static/media/anouncementGreen.a8e32305.svg)";
    color = "#0D941A";
  }
  else {
    image = "url(/_next/static/media/anouncementBlue.869101e4.svg)";
    color = "#16C8FC";
  }
  return (
    <div className="anouncementCard" style={{
      backgroundImage: image,
      color: color,
    }}>
      <div className="anouncementContent">
        <div className="anouncementHeading">
          <p>{heading}</p>
        </div>
        <div className="anouncementDescription">
          {description}
        </div>
      </div>
      <div className="anouncementDetails">
        <div className="fields">
          {typeof time === 'string' ? (<h5>Time :</h5>) : (<></>)}
          {typeof venue === 'string' ? (<h5>Venue :</h5>) : (<></>)}
          {typeof date === 'string' ? (<h5>Date :</h5>) : (<></>)}
        </div>
        <div className="anouncementValues">
          <h5>{time}</h5>
          <h5>{venue}</h5>
          <h5>{date}</h5>
        </div>
      </div>
      <div className="anouncementNote">
        {typeof note === 'string' ? (<h5>{note}</h5>) : (<></>)}
      </div>
    </div>
  );
};
export default AnouncementCard;
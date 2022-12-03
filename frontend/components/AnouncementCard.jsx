import PropTypes from 'prop-types'
import React from 'react';

const AnouncementCard = ({ date, heading, description, time, venue, note }) => {
  return (
    <div className="anouncementCard">
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
import PropTypes from 'prop-types'
import React from 'react';

const EventCard = ({date, heading, description}) => {
    return (
    <div className="card">
        <div className="card__container">
            <div className="date">
                <h5>{date}</h5>
            </div>
            <div className="card_content">
            <h3><b>{heading}</b></h3>
            {description}
            </div>
        </div>
    </div> 
    );
  };
  EventCard.defaultProp={
    date:"12th October",
    heading: "Lorem Ipsum",
    description:"Idk what to write here"
}

EventCard.defaultProp={
    date: PropTypes.string,
    heading: PropTypes.string,
    description: PropTypes.string
}
export default EventCard;
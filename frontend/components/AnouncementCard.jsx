import PropTypes from 'prop-types'
import React from 'react';

const AnouncementCard = ({ date, heading, description }) => {
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
export default AnouncementCard;
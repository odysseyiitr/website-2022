import PropTypes from 'prop-types'
import React from 'react';

const PendingCard = ({ Card}) => {

  return (
    <div className="pendingCard" >
      <div className="requestsTop">
        <p className='top'>{Card.username}/ {Card.pr_repo}/ {Card.pr_branch} -&gt;</p>
        <p className='top'>{Card.pr_repo}/ master</p>
      </div>
      <div className="requestsTitle">
        <p className='prTitle'>{Card.pr_title}</p>
      </div>
    </div>
  );
};
export default PendingCard
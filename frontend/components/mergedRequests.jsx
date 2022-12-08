import PropTypes from 'prop-types'
import React from 'react';

const MergedCard = ({ username, pr_title, pr_repo, pr_branch }) => {
  return (
    <div className="mergedCard" >
      <div className="requestsTop">
      <p className='top'>{username}/ {pr_repo}/ {pr_branch} -&gt;</p>
      <p className='top'>{pr_repo}/ master</p>
      </div>
      <div className="requestsTitle">
      <p className='prTitle'>{pr_title}</p>
      </div>
    </div>
  );
};
export default MergedCard;
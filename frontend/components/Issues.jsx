import React from "react";

const Issue = ({ Card }) => {
  return (
    <div className="repobox">
      <div
        style={{
          textAlign: "center",
          margin: "1rem",
        }}
      >
        <h4>
          <b>
            {Card.repoName} - {Card.tag}
          </b>
        </h4>
        <a href={Card.issueUrl} target="_blank" rel="noreferrer">
          {Card.issueTitle}
        </a>
      </div>
      <div className="mentor">Mentored by - {Card.mentor}</div>
    </div>
  );
};

export default Issue;

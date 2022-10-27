const Card = ({ CardData }) => {
  return (
    <>
      {CardData.map((Card, i) => (
        <div className="card" key={i}>
          <div className="card__container">
            <h4>
              <b>
                {Card.repoName} - {Card.tag}
              </b>
            </h4>
            <p>{Card.issueTitle}</p>
            <p>Mentored by - {Card.mentor}</p>
            {Card.claim == false ? (
              <button>Read More</button>
            ) : (
              <p>Assigned to - {Card.assignee}</p>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default Card;

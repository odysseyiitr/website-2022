import { useSession } from "next-auth/react";
import { useState } from "react";
import Loader from "./Loader";

const axios = require("axios").default;

const Repo = ({ Card, callback }) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  if (Card.claim == true)
    var cardColour = "none";
  else
    var cardColour = "linear-gradient(90deg, rgba(50, 18, 138, 0.207) 0%, rgba(80, 41, 189, 0.207) 0.01%, rgba(170, 28, 100, 0.237) 58.85%, rgba(233, 69, 96, 0.3) 100%), linear-gradient(90deg, #1D0F44 0%, #3D0E3D 100%)";

  async function claimIssue(Card) {
    if (loading) {
      return <Loader />
    }
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}api/claim-issue/`,
      {
        access_token: session.accessToken,
        id_token: session.user.id,
        issue: Card.issueUrl,
      }
    );
  }


  return (
    <div className="repobox" style={{ background: cardColour }}>
      <div className="cardTag">{Card.tag}</div>
      <div className="issueDetails">
        <div>
          <h4>
            <b className="issue">
              ISSUE NAME - {Card.repoName} -
              <a href={Card.issueUrl} target="_blank" rel="noreferrer">
                {Card.issueTitle}
              </a>
            </b>
          </h4>
        </div>
        <div className="mentor">
          MENTOR : {Card.mentor}
        </div>

        {Card.claim == false ? (
          <div className='assignee'>
            <br />
            ASSIGNEE : None
          </div>
        ) : (
          <>
            <div className='assignee'>
              <br />
              ASSIGNEE : {Card.assignee}
            </div>
          </>
        )}

        <div >
          {Card.claim == false ? (
            <button
              className="button"
              style={{
                position: "absolute",
                right: "2.75rem",
                bottom: "1.875rem",
              }}
              onClick={() =>
                claimIssue(Card, session).then(() => {
                  callback().then(() => setLoading(false));
                })
              }
            >
              Claim
            </button>
          ) : (
            <button
              className="button"
              style={{
                position: "absolute",
                right: "2.75rem",
                bottom: "1.875rem",
                backgroundColor: "#E95F8D",
                borderColor: "#E95F8D",
                color: "#FFF"
              }}
              onClick={() =>
                unclaimIssue(Card, session).then(() => {
                  callback().then(() => setLoading(false));
                })
              }
            >
              UnClaim
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Repo;

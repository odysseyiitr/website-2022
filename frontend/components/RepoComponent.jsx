import { useSession } from "next-auth/react";
import { useState } from "react";
import Loader from "./Loader";

const axios = require("axios").default;

const Repo = ({ Card, callback }) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);

  async function claimIssue(Card) {
    if (loading) {
      return <Loader />
    }
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}backend/api/claim-issue/`,
      {
        access_token: session.accessToken,
        id_token: session.user.id,
        issue: Card.issueUrl,
      }
    );
  }


  return (
    <div className="repobox">
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
            <>
              <div className='assignee'>
                <br />
                ASSIGNEE : {Card.assignee}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Repo;

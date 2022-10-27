import { useSession } from "next-auth/react";
import { useState } from "react";
import Loader from "./Loader"; 

const axios = require("axios").default;

const Repo = ({ Card, callback }) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);

  async function claimIssue(Card) {
    if(loading){
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
      <div className="mentor">
        {/* Mentored by - {Card.mentor} */}
        {Card.claim == false ? (
          <button
            className="button"
            style={{
              marginLeft: "auto",
              marginTop: "15px",
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
            <br />
            Assigned to - {Card.assignee}
          </>
        )}
      </div>
    </div>
  );
};

export default Repo;

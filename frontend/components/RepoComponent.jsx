import { useSession } from "next-auth/react";
import { useState } from "react";
import Loader from "./Loader";
import axios from "axios";
import { useCallback } from "react";
import { signIn } from "next-auth/react";

const UNCLAIMED_CARD_COLOR = "linear-gradient(90deg, rgba(50, 18, 138, 0.207) 0%, rgba(80, 41, 189, 0.207) 0.01%, rgba(170, 28, 100, 0.237) 58.85%, rgba(233, 69, 96, 0.3) 100%), linear-gradient(90deg, #1D0F44 0%, #3D0E3D 100%)";

const Repo = ({ Card, refetch }) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const handleClaimIssue = useCallback(async() => {
    setLoading(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}api/claim-issue/`,
        {
          access_token: session.accessToken,
          id_token: session.user.id,
          issue: Card.issueUrl,
        }
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      refetch();
    }
  }, [session?.user?.id, session?.accessToken, Card.issueUrl, refetch])

  const handleUnclaimIssue = useCallback(async() => {}, []); // TBD
  
  const renderClaimButton = () => {
    const isLoggedIn = session?.user?.id && session?.accessToken; 
    if(!isLoggedIn) {
      // If not logged in, show login button
      return (
        <button className="button" onClick={() => signIn('github')}>
          Login
        </button>
      )
    }

    if(Card.claim && Card.assignee === session?.user?.name) {
      return (
        // If logged in and issue is claimed by the user, show unclaim button
        <button className="button" 
          onClick={handleUnclaimIssue}
          style={{
            backgroundColor: "#E95F8D",
            borderColor: "#E95F8D",
            color: "#FFF"
          }}
        >
          Unclaim
        </button>
      )
    }

    // If logged in and issue is claimed by someone else, show nothing

    if(!Card.claim) {
      // If logged in and issue is unclaimed, show claime button
      return (
        <button className="button" onClick={handleClaimIssue}>
          Claim
        </button>
      )
    }
  }

  if(loading) {
    return <Loader />
  }

  return (
    <div className="repobox" style={{ background: Card.claim ? 'none' : UNCLAIMED_CARD_COLOR }}>
      <div className="cardTag">{Card.tag}</div>
      <div className="issueDetails">
        <div>
          <h4>
            <i>{Card.repoName}</i> - {' '}
            <b className="issue">
              <a href={Card.issueUrl} target="_blank" rel="noreferrer">
                {Card.issueTitle}
              </a>
            </b>
          </h4>
        </div>
        <div className="buttonWrap">
          <div>
            <div className="mentor">
              MENTOR : {Card.mentor}
            </div>
            {!Card.claim ? (
              <div className='assignee'>
                ASSIGNEE : None
              </div>
            ) : (
              <div className='assignee'>
                ASSIGNEE : {Card.assignee}
              </div>
            )}
          </div>
          {renderClaimButton()}
        </div>
      </div>
    </div>
  );
};

export default Repo;

import { useEffect, useState } from "react";
import Repo from "./RepoComponent";
import { axios } from 'axios';
import { useSession } from "next-auth/react";

const ReposToContribute = ({ list, refetch }) => {
  const [disableClaim, setDisableClaim] = useState(false);
  const { data: session } = useSession();

  const checkClaimEligibility = async () => {
    if(!session?.accessToken || !session?.user?.id) return;
    try {
      const {data: user} = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}api/get-user/`,
        { access_token: session.accessToken, id_token: session.user.id },
      );
      if(Boolean(user.assignedIssue)) {
        setDisableClaim(true)
      } else {
        setDisableClaim(false)
      }
    }
      catch (e) {
        console.error(e);
      }
  }

  useEffect(() => {
    checkClaimEligibility();  
    // run on mount only
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="repodialogue">
      <div className="scroll">
        {list.map((card) => (
          <Repo Card={card} key={card.issueTitle} refetch={refetch} disableClaim={disableClaim} />
        ))}
      </div>
    </div>
  );
};

export default ReposToContribute;

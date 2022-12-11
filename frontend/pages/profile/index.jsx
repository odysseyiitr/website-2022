import Profile from "../../components/Profile";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import PendingCard from "../../components/PendingCard";
import MergedList from "../../components/MergedList";

const axios = require("axios").default;

export default function Home() {
  const [Merged, setMerged] = useState([]);
  const [Pending, setPending] = useState([]);
  const { data: session } = useSession();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}api/get-user/`,
      {
        access_token: session.accessToken,
        id_token: session.user.id,
      },
      { headers: { "Content-Type": "application/json" } }
    );

    const issue = response.data.user.assignedIssue;
    setPending(JSON.parse(JSON.stringify(issue)));

    const issues = response.data.user.completedIssues;
    let repos = [];
    if (issues != undefined || issues != null)
      issues.forEach(async (element) => {
        var repoInfo = element.issue.split("/");
        repos = JSON.parse(JSON.stringify(repos));
        repos.push({
        });
        setMerged(JSON.parse(JSON.stringify(repos)));
      });
    return response;
  };

  useEffect(() => {
    if (session)
      fetchUserData().then((response) => {
        let userData = {};
        userData.uname = response.data.username;
        userData.role = response.data.field;
        userData.eno = response.data.enrollmentNo;
        userData.contact = response.data.contactNo;
        userData.aname = response.data.name;
        userData.email = response.data.email;
        userData.pfp = session.user.image;
        userData.rank = response.data.rank;
        setUser(userData);
        setLoading(false)
      });
  }, [session]);

  if (loading) {
    return <Loader />;
  } else {
    return (
      <>
        {user ? (
          <div className="profile">
            <div className="profile-page-content">
              <Profile
                uname={user.uname}
                aname={user.aname}
                role={user.role}
                eno={user.eno}
                contact={user.contact}
                email={user.email}
                pfp={user.pfp}
                rank={user.rank}
              />
            </div>
            <div className="split_right">
              <h1 className="merge_request">merged pull requests</h1>
              <MergedList list={Merged} />
              <h1 className="pending_request">pending pull requests</h1>
              <PendingCard Card={Pending}/>
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </>
    );
  }
}

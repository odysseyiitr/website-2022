import Profile from "../../components/Profile";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import PendingList from "../../components/PendingList";
import MergedList from "../../components/MergedList";

const axios = require("axios").default;

export default function Home() {
  const [Merged, setMerged] = useState([]);
  const [Pending, setPending] = useState([]);
  const { data: session } = useSession();
  const [user, setUser] = useState(null);

  const fetchUserData = async () => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}api/get-user/`,
      {
        access_token: session.accessToken,
        id_token: session.user.id,
      },
      { headers: { "Content-Type": "application/json" } }
    );
    return response;
  };

  const fetchMerged = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}api/get-user/`
    );
    const issues = response.data.completedIssues;
    let repos = [];
    console.log(issues);
    issues.forEach(async (element) => {
      var repoInfo = element.issue.split("/");
      repos = JSON.parse(JSON.stringify(repos));
      repos.push({
      });
      setMerged(JSON.parse(JSON.stringify(repos)));
    });
  };

  const fetchPending = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}api/get-user/`
    ); 
    const issues = response.data.assignedIssues;
    let repos = [];
    console.log(issues);
    data.forEach(async (element) => {
      var repoInfo = element.issue.split("/");
      repos = JSON.parse(JSON.stringify(repos));
      repos.push({
      });
      setPending(JSON.parse(JSON.stringify(repos)));
    });
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
      });
  }, [session]);

  return (
    <>
      {user ? (
        <div className="profile">
          <div className="profile-page-content split_left">
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
            <h1 className="request">merged pull requests</h1>
            <MergedList list={Merged} callback={fetchMerged} />
            <h1 className="request">pending pull requests</h1>
            <PendingList list={Pending} callback={fetchPending} />
          </div>
        </div>
      ) : (
        <div>loading</div>
      )}
    </>
  );
}

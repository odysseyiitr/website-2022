import Profile from "../../components/Profile";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import UserProgress from "../../components/UserProgress";
import ProfileIssues from "../../components/ProfileIssues";

const axios = require("axios").default;

export default function Home() {
  const { data: session } = useSession();
  const [user, setUser] = useState(null);

  const fetchUserData = async () => {
    const {data} = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}api/get-user/`,
      {
        access_token: session.accessToken,
        id_token: session.user.id,
      },
      { headers: { "Content-Type": "application/json" } }
    );

    return data;
  };
  useEffect(() => {
    if (session)
      fetchUserData().then((response) => {
        let userData = {};
        userData.uname = response.user.username;
        userData.role = response.user.field;
        userData.eno = response.user.enrollmentNo;
        userData.contact = response.user.contactNo;
        userData.aname = response.user.name;
        userData.email = response.user.email;
        userData.pfp = session.user.image;
        userData.rank = response.rank;
        setUser(userData);
      });
  }, [session]);

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
            />
            {/* Find better logic to fill progress bar */}
            <UserProgress progress={1/user.rank * 100} rank={user.rank} />
          </div>
          {user.issue && <ProfileIssues issue={user.issue} />}
        </div>
      ) : (
        <div className="profile-loading">LOADING</div>
      )}
    </>
  );
}

import Profile from "../../components/Profile";
import { useSession } from "next-auth/react";
import UserProgress from "../../components/UserProgress";
import ProfileIssues from "../../components/ProfileIssues";
import useUserStore from "../../store/userStore";

const axios = require("axios").default;

export default function Home() {
  const user = useUserStore((state) => state.user);
  const { data: session } = useSession();
  return (
    <>
      {user ? (
        <div className="profile">
          <div className="profile-page-content">
            <Profile
              uname={user.username}
              aname={user.name}
              role={user.field}
              eno={user.enrollmentNo}
              contact={user.contactNo}
              email={user.email}
              pfp={session.user.image}
            />
            {/* Find better logic to fill progress bar */}
            <UserProgress progress={user.completedIssues?.length} rank={user.rank} />
          </div>
          {user.issue && <ProfileIssues issue={user.assignedIssue} />}
        </div>
      ) : (
        <div className="profile-loading">LOADING</div>
      )}
    </>
  );
}

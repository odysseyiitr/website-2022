import React, { useEffect } from "react";
import Issue from "./Issues";
import Repo from "./RepoComponent";
const axios = require("axios").default;

const ProfileIssues = ({ issue }) => {
  const [issues, setIssues] = React.useState({});
  const fetchIssue = async () => {
    const response = await axios.get(
      `https://odyssey.iitr.ac.in/backend/api/get-issue/?issue=${issue}`
    );
    return response.data;
  };
  useEffect(() => {
    if (issue)
      fetchIssue().then((element) => {
        var repoInfo = issue.split("/");
        setIssues({
          repoName: repoInfo[3],
          tag: repoInfo[4],
          issueTitle: element.issueName,
          mentor: element.mentorId,
          claim: element.assigneeId ? true : false,
          assignee: element.assigneeId,
          issueUrl: element.issue,
        });
      });
  }, [issue]);
  return (
    <div className="profile_issues">
      <p>ASSIGNED ISSUE</p>
      <Issue Card={issues} />
    </div>
  );
};

export default ProfileIssues;

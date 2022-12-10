import ReposToContribute from "../../components/RepoList";
import Loader from "../../components/Loader";
import Filter from "../../components/Filter";
import { useEffect, useState } from "react";
import React from "react";
import { useSession } from "next-auth/react";
import Info from "../../components/Info";

const axios = require("axios").default;

const PARTICIPATION_DETAILS = [
  "Sign up to start your contributions.",
  "Go through the issues and claim any unassigned issue that interests you.",
  "If your pull request is merged, it will show on your profile and boost you up the leaderboard.",
  "The top 30 contributors on the leaderboard will receive T-shirts and swag, so try to get as many pull requests merged, as you can!",
];

export default function Home() {
  const [margin, setMargin] = useState();
  const [CardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRepos = async () => {
    setLoading(true);
    try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}api/get-all-issues/`
    );
    let repos = [];
    data.forEach(async (element) => {
      var repoInfo = element.issue.split("/");
      repos = JSON.parse(JSON.stringify(repos));
      repos.push({
        repoName: repoInfo[3],
        tag: element.issueDifficulty,
        issueTitle: element.issueName,
        mentor: element.mentorId,
        claim: element.assigneeId ? true : false,
        assignee: element.assigneeId,
        issueUrl: element.issue,
      });
      setCardData(JSON.parse(JSON.stringify(repos)));
    });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (window.innerWidth < 576) {
      setMargin("2.5rem");
    }
    else {
      setMargin("6.25rem");
    }
    fetchRepos();
  }, []);

  if (loading) {
    return <Loader />;
  } 

  return (
    <>
      <div className="about" style={{ marginTop: margin }}>
        <div className="pickIssues">
          <p>PICK YOUR ISSUES</p>
          {/* <Filter /> */}
        </div>
      </div>
      <div className="content">
          <ReposToContribute list={CardData} refetch={fetchRepos} />
        </div>
      <div className="participationB">
        <Info
          heading={"Participation Details"}
          text={PARTICIPATION_DETAILS}
        />
        <Info
          heading={"Resources"}
          text={['Visit https://github.com/sdslabs/recommends']}
        />
      </div>
    </>
  );
}

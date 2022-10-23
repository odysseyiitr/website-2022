import ReposToContribute from "../../components/RepoList";
import Resources from "../../components/Resources";
import Searchbar from "../../components/Searchbar";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Octokit, App } from "octokit";
import Info from "../../components/Info";

const axios = require("axios").default;

export default function Home() {
  const [CardData, setCardData] = useState([]);
  const ParticipationDetailsData = [
    "Sign up to start your contributions.",
    "Go through the issues and claim any unassigned issue that interests you.",
    "If your pull request is merged, it will show on your profile and boost you up the leaderboard.",
    "The top 30 contributors on the leaderboard will receive T-shirts and swag, so try to get as many pull requests merged, as you can!",
  ];

  const fetchRepos = async () => {
    const octokit = new Octokit();

    const { data } = await axios.get(
      `https://odyssey.iitr.ac.in/backend/api/get-all-issues/`
    );
    let repos = [];
    data
      .filter((issue) => !issue.completed)
      .forEach(async (element) => {
        var repoInfo = element.issue.split("/");
        let info = await octokit.request(
          "GET /repos/{owner}/{repo}/issues/{issue_number}",
          {
            owner: repoInfo[3],
            repo: repoInfo[4],
            issue_number: repoInfo[6],
          }
        );
        repos = JSON.parse(JSON.stringify(repos));
        repos.push({
          repoName: repoInfo[3],
          tag: repoInfo[4],
          issueTitle: info.data.title,
          mentor: element.mentorId,
          claim: element.assigneeId ? true : false,
          assignee: element.assigneeId,
          issueUrl: element.issue,
        });
        setCardData(JSON.parse(JSON.stringify(repos)));
      });
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  return (
    <>
      <div className="about" style={{ marginTop: "100px" }}>
        <div className="searchandissues">
          <p className="heading">PICK YOUR ISSUES</p>
          <Searchbar />
        </div>
      </div>
      <ReposToContribute list={CardData} callback={fetchRepos} />
      <div className="participationB">
        <Info
          heading={"Participation Details"}
          text={ParticipationDetailsData}
        />
        {/* <Info heading={"Pull Merge Request Details"} text={[]} />
        <Info heading={"Code of Conduct"} text={[]} /> */}
        {/* <Resources /> */}
      </div>
    </>
  );
}

import ReposToContribute from "../../../components/RepoList";
import Resources from "../../../components/Resources";
import Searchbar from "../../../components/Searchbar";
import Loader from "../../../components/Loader";
import Filter from "../../../components/Filter";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Info from "../../../components/Info";
import RepoComponent from "../../../components/RepoComponent";

const axios = require("axios").default;

export default function Home() {
    const [CardData, setCardData] = useState([]);
    const [loading, setLoading] = useState(true);
    const ParticipationDetailsData = [
        "Sign up to start your contributions.",
        "Go through the issues and claim any unassigned issue that interests you.",
        "If your pull request is merged, it will show on your profile and boost you up the leaderboard.",
        "The top 30 contributors on the leaderboard will receive T-shirts and swag, so try to get as many pull requests merged, as you can!",
    ];
    const fetchRepos = async () => {
        const { data } = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}api/get-all-issues/`
        );
        let repos = [];
        data.forEach(async (element) => {
            var repoInfo = element.issue.split("/");
            repos = JSON.parse(JSON.stringify(repos));
            repos.push({
                repoName: repoInfo[3],
                tag: repoInfo[4],
                issueTitle: element.issueName,
                mentor: element.mentorId,
                claim: element.assigneeId ? true : false,
                assignee: element.assigneeId,
                issueUrl: element.issue,
            });
            setCardData(JSON.parse(JSON.stringify(repos)));
        });
    };
    useEffect(() => {
        fetchRepos().then(() => setLoading(false));
    }, []);
    if (loading) {
        return <Loader />;
    } else {
        return (
            <>
                <div className="about" style={{ marginTop: "6.25rem" }}>
                    <div className="pickIssues">
                        <p>PICK YOUR ISSUES</p>
                        {/* <Searchbar /> */}
                        <Filter />
                    </div>
                </div>
                <div className="content">
                    <ReposToContribute list={CardData} callback={fetchRepos} />
                </div>
                <div className="participationB">
                    <Info
                        heading={"Participation Details"}
                        text={ParticipationDetailsData}
                    />
                    {/* <Info heading={"Pull Merge Request Details"} text={[]} />
          <Info heading={"Code of Conduct"} text={[]} />
          <Resources /> */}
                </div>
            </>
        );
    }
}

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
  let defaultTagMap = new Map([
    ["easy", false],
    ["medium", false],
    ["hard", false],
    ["claimed", false],
    ["unclaimed", false],
  ]);
  const [margin, setMargin] = useState();
  const [CardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tagMap, setTagMap] = useState(defaultTagMap);
  const [filterCount, setFilterCount] = useState(0);

  const updateTagMap = (tag) => {
    let currValue = tagMap.get(tag);
    if (currValue) setFilterCount(filterCount - 1);
    else setFilterCount(filterCount + 1);
    setTagMap((map) => new Map(map.set(tag, !currValue)));
  };
  let repos = [];
  const fetchRepos = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}api/get-all-issues/`
      );
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
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
    setCardData(JSON.parse(JSON.stringify(repos)));
  };
  useEffect(() => {
    if (window.innerWidth < 576) {
      setMargin("2.5rem");
    } else {
      setMargin("6.25rem");
    }
    fetchRepos();
  }, []);

  useEffect(() => {
    let filteredRepo = repos.filter(
      (repo) =>
        tagMap.get(repo.tag) &&
        (!tagMap.get("claimed") || repo.claim) &&
        (!tagMap.get("unclaimed") || !repo.claim)
    );
    setCardData(JSON.parse(JSON.stringify(filteredRepo)));
  }, [tagMap]);

  useEffect(() => {
    if (filterCount == 0) setCardData(JSON.parse(JSON.stringify(repos)));
  }, [filterCount]);

  if (loading) {
    return <Loader />;
  } else {
    return (
      <>
        <div className="about" style={{ marginTop: margin }}>
          <div className="pickIssues">
            <p>PICK YOUR ISSUES</p>
            {/* <Searchbar /> */}
            <Filter
              tagMap={tagMap}
              updateTagMapCallback={updateTagMap}
              count={filterCount}
            />
          </div>
        </div>
        <div className="content">
          <ReposToContribute list={CardData} />
        </div>
        <div className="participationB">
          <Info
            heading={"Participation Details"}
            text={PARTICIPATION_DETAILS}
          />
          <Info
            heading={"Resources"}
            text={["Visit https://github.com/sdslabs/recommends"]}
          />
        </div>
      </>
    );
  }
}

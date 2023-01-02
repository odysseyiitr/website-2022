import ReposToContribute from "../../components/RepoList";
import Loader from "../../components/Loader";
import Filter from "../../components/Filter";
import React, { useEffect, useState, useMemo } from "react";
import Info from "../../components/Info";

const axios = require("axios").default;

const PARTICIPATION_DETAILS = [
  "Sign up to start your contributions.",
  "Go through the issues and claim any unassigned issue that interests you.",
  "If your pull request is merged, it will show on your profile and boost you up the leaderboard.",
  "The top 30 contributors on the leaderboard will receive T-shirts and swag, so try to get as many pull requests merged, as you can!",
];

export default function Home() {
  let repos = useMemo(() => [], []);
  const [margin, setMargin] = useState();
  const [CardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCount, setFilterCount] = useState(0);
  const [difficultyFilters, setDifficultyFilters] = useState(
    new Map([
      ["Easy", false],
      ["Medium", false],
      ["Hard", false],
    ])
  );
  const [statusFilters, setStatusFilters] = useState(
    new Map([
      ["Claimed", false],
      ["Unclaimed", false],
      ["Completed", false],
    ])
  );

  let updateDifficultyFilters = (item) => {
    let currValue = difficultyFilters.get(item);

    if (currValue) setFilterCount((prevFilterCount) => prevFilterCount - 1);
    else setFilterCount((prevFilterCount) => prevFilterCount + 1);

    setDifficultyFilters(
      (prevDifficultyFilter) =>
        new Map(prevDifficultyFilter.set(item, !currValue))
    );
  };

  let updateStatusFilters = (item) => {
    let currValue = statusFilters.get(item);

    if (currValue) setFilterCount((prevFilterCount) => prevFilterCount - 1);
    else setFilterCount((prevFilterCount) => prevFilterCount + 1);

    setStatusFilters(
      (prevStatusFilter) => new Map(prevStatusFilter.set(item, !currValue))
    );
  };

  let updateFilteredRepos = () => {
    let filteredRepos = repos.filter(
      (item) => checkDifficultyFilter(item) && checkStatusFilter(item)
    );
    setCardData(filteredRepos);
  };

  const fetchRepos = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}api/get-all-issues/`
      );
      repos.length = 0; // clear the array
      data.forEach(async (element) => {
        var repoInfo = element.issue.split("/");
        repos.push({
          repoName: repoInfo[3],
          tag: element.issueDifficulty,
          issueTitle: element.issueName,
          mentor: element.mentorId,
          claim: element.assigneeId ? true : false,
          assignee: element.assigneeId,
          issueUrl: element.issue,
          completed: element.completed,
        });
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
    updateFilteredRepos();
  };

  useEffect(() => {
    if (window.innerWidth < 576) {
      setMargin("2.5rem");
    } else {
      setMargin("6.25rem");
    }
    fetchRepos();
  }, []);

  let checkDifficultyFilter = (item) => {
    let isFilterEmpty = true;
    for (let [filter, value] of difficultyFilters) {
      if (value === true) {
        isFilterEmpty = false;
        break;
      }
    }

    if (isFilterEmpty) return true;
    return difficultyFilters.get(item.tag);
  };

  let checkStatusFilter = (item) => {
    let isFilterEmpty = true;
    for (let [filter, value] of statusFilters) {
      if (value === true) {
        isFilterEmpty = false;
        break;
      }
    }

    if (isFilterEmpty) return true;

    if (item.completed) return statusFilters.get("Completed");
    if (item.claim) return statusFilters.get("Claimed");
    if (!item.claim) return statusFilters.get("Unclaimed");
  };

  useEffect(() => {
    updateFilteredRepos();
  }, [difficultyFilters, statusFilters]);

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
              difficultyFilters={difficultyFilters}
              statusFilters={statusFilters}
              count={filterCount}
              updateDifficultyFilters={updateDifficultyFilters}
              updateStatusFilters={updateStatusFilters}
            />
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
            text={["Visit https://github.com/sdslabs/recommends"]}
          />
        </div>
      </>
    );
  }
}

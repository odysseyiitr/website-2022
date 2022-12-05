import Repo from "./RepoComponent";

const ReposToContribute = ({ list, callback }) => {
  return (
    <div className="repodialogue">
      <div className="scroll">
        {/* {list.map((Card, i) => {
          return <Repo Card={Card} key={i} callback={callback} />;
        })} */}
        <Repo Card={{ "tag": "easy", "claim": true, "mentor": "mayank", "repoName": "Rootex", "issueTitle": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor", 'assignee': "jai_ho" }} />
        <Repo Card={{ "tag": "medium", "claim": true, "mentor": "mayank", "repoName": "Rootex" }} />
        <Repo Card={{ "tag": "hard", "claim": false, "mentor": "mayank", "repoName": "Rootex" }} />
        <Repo Card={{ "tag": "aukaat se bahar", "claim": true, "mentor": "mayank", "repoName": "Rootex" }} />
        <Repo Card={{ "tag": "nhi hoga", "claim": true, "mentor": "mayank", "repoName": "Rootex" }} />
        <Repo Card={{ "tag": "Python", "claim": true, "mentor": "mayank" }} />
        <Repo Card={{ "tag": "Typescrit", "claim": true, "mentor": "mayank" }} />
        <Repo Card={{ "tag": "Python", "claim": true, "mentor": "mayank" }} />
        <Repo Card={{ "tag": "Good-first Issue", "claim": true, "mentor": "mayank" }} />
        <Repo Card={{ "tag": "easy", "claim": true, "mentor": "mayank" }} />
        <Repo Card={{ "tag": "easy", "claim": true, "mentor": "mayank" }} />
        <Repo Card={{ "tag": "easy", "claim": true, "mentor": "mayank" }} />
        <Repo Card={{ "tag": "easy", "claim": true, "mentor": "mayank" }} />
        <Repo Card={{ "tag": "easy", "claim": true, "mentor": "mayank" }} />
        <Repo Card={{ "tag": "easy", "claim": true, "mentor": "mayank" }} />
        <Repo Card={{ "tag": "easy", "claim": true, "mentor": "mayank" }} />
        <Repo Card={{ "tag": "easy", "claim": true, "mentor": "mayank" }} />
        <Repo Card={{ "tag": "easy", "claim": true, "mentor": "mayank" }} />
        <Repo Card={{ "tag": "easy", "claim": true, "mentor": "mayank" }} />
        <Repo Card={{ "tag": "easy", "claim": true, "mentor": "mayank" }} />
        <Repo Card={{ "tag": "easy", "claim": true, "mentor": "mayank" }} />
      </div>
    </div>
  );
};

export default ReposToContribute;

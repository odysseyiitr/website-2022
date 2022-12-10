import Repo from "./RepoComponent";

const ReposToContribute = ({ list, refetch }) => (
  <div className="repodialogue">
    <div className="scroll">
      {list.map((card) => (
        <Repo Card={card} key={card.issueTitle} refetch={refetch} /> 
      ))} 
    </div>
  </div>
);

export default ReposToContribute;

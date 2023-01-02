import Repo from "./RepoComponent";

const ReposToContribute = ({ list, refetch }) => (
  <div className="repodialogue">
    <div className="scroll">
      {list.map((card, index) => (
        <Repo Card={card} key={index} refetch={refetch} />
      ))}
    </div>
  </div>
);

export default ReposToContribute;

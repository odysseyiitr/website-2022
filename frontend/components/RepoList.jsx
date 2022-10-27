import Repo from "./RepoComponent";

const ReposToContribute = ({ list, callback }) => {
  return (
    <div className="repodialogue">
      <div className="scroll">
        {list.map((Card, i) => {
          return <Repo Card={Card} key={i} callback={callback} />;
        })}
      </div>
    </div>
  );
};

export default ReposToContribute;

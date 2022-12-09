import PendingCard from "./PendingCard";

const PendingList= ({ list, callback }) => {
    return (
        list.map((Card, i) => {
            return <PendingCard Card={Card} key={i} callback={callback} />;
        })
    );
};

export default PendingList;

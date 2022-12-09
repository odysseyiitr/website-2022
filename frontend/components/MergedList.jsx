import MergedCard from "./MergedCard";

const MergedList= ({ list, callback }) => {
    return (
        list.map((Card, i) => {
            return <MergedCard Card={Card} key={i} callback={callback} />;
        })
    );
};

export default MergedList;

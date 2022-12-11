import MergedCard from "./MergedCard";

const MergedList= ({ list}) => {
    return (
        list.map((Card, i) => {
            return <MergedCard Card={Card} key={i} />;
        })
    );
};

export default MergedList;

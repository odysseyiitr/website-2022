import PropTypes from "prop-types";
import Image from "next/image";
const MemberCards = ({ imgsource, name }) => {
  return (
    <div
      className="membercard"
      style={{
        backgroundImage: `url(${imgsource})`,
      }}
    >
      <figcaption className="membername">{name}</figcaption>
    </div>
  );
};

MemberCards.defaultProp = {
  imgsource: "/",
  name: "Lorem Ipsum",
};

MemberCards.defaultProp = {
  imgsource: PropTypes.string,
  name: PropTypes.string,
};
export default MemberCards;

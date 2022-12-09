import PropTypes from "prop-types";
const TextDash = ({ text }) => {
  return (
    <div className="textsmall">
      <img src="/images/list_dash.svg" />
      <p className="info">{text}</p>
    </div>
  );
};

TextDash.defaultProp = {
  text: "Lorem Ipsum",
};

TextDash.defaultProp = {
  text: PropTypes.string,
};

export default TextDash;

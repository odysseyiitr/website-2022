import React, { useState } from "react";

const JoinSlackButton = ({ text, type, onClick }) => {
  const [buttonActive, setButtonActive] = useState(false);
  const classNameGenerator = (...classes) => {
    return classes.join(" ");
  };

  return (
    <button
      onMouseDown={() => setButtonActive(!buttonActive)}
      onMouseUp={() => setButtonActive(!buttonActive)}
      className={classNameGenerator("btn") + " " + buttonActive}
      type={type}
      onClick={onClick}
    >
      <div className="join-slack">
        <div>{text}</div>
        <div><img src="/images/slack-icon.svg"></img></div>
      </div>
    </button>
  );
};

export default JoinSlackButton;

import React, { useState } from "react";
const GradientButton = ({ text, type, onClick }) => {
    const [buttonActive, setButtonActive] = useState(false);
    const classNameGenerator = (...classes) => {
      return classes.join(" ");
    };
  
    return (
      <button
        onMouseDown={() => setButtonActive(!buttonActive)}
        onMouseUp={() => setButtonActive(!buttonActive)}
        className={classNameGenerator("gradient-button") + " " + buttonActive}
        type={type}
        onClick={onClick}
      >
        {text}
      </button>
    );
  };
  
  export default GradientButton;
  
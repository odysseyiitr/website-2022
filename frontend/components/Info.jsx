import TextDash from "./TextDash";
import React, { useState } from "react";

const Info = ({ heading, text }) => {
  const [listVisible, setDivVisible] = useState(true  );
  const classNameGenerator = (...classes) => {
    return classes.join(" ");
  };
  return (
    <div
      className="about"
      style={{
        marginTop: "50px",
      }}
    >
      <p>{heading}</p>
      <div className={classNameGenerator("list1") + " " + listVisible + "list"}>
        {text.map((item, i) => {
          return <TextDash text={item} key={i} />;
        })}
      </div>
    </div>
  );
};

export default Info;

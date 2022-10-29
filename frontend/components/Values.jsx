import TextSmall from "./TextDash";
import React, { useState } from "react";

const Values = ({}) => {
    const [listVisible, setDivVisible] = useState(false);
    const classNameGenerator = (...classes) => {
        return classes.join(" ");
      };

    return (
    <div className="about">
        <p onClick={() => setDivVisible(!listVisible)}>Values</p>
        <div className={classNameGenerator("list1") + " " + listVisible + "list"}>
            <TextSmall text="helo"/>
            <TextSmall text="helo"/>
            <TextSmall text="helo"/>
        </div>
    </div> 
    );
};

export default Values;
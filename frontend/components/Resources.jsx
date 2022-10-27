import TextPlus from "./TextPlus";
import TextCircle from "./TextCircle";
import React, { useState } from "react";

const Resources = ({}) => {
    const [listVisible, setDivVisible] = useState(false);
    const [list2VisibleA, setDiv2VisibleA] = useState(false);
    const [list2VisibleB, setDiv2VisibleB] = useState(false);
    const [list2VisibleC, setDiv2VisibleC] = useState(false);
    const classNameGenerator = (...classes) => {
        return classes.join(" ");
    };

    return (
    <div className="about">
        <p onClick={() => setDivVisible(!listVisible)}>Resources For Beginners</p>
        <div className={classNameGenerator("list1") + " " + listVisible + "list"}>
        <div onClick={() => setDiv2VisibleA(!list2VisibleA)}>
        <TextPlus text="helo"/>
        <div className={classNameGenerator("textcirclecont")+" "+ list2VisibleA + "list"}>
            <TextCircle text="Lorem ipsum"/>
            <TextCircle text="Lorem ipsum"/>
            <TextCircle text="Lorem ipsum"/>
        </div>
        </div>
        <div onClick={() => setDiv2VisibleB(!list2VisibleB)}>
        <TextPlus text="helo"/>
        <div className={classNameGenerator("textcirclecont")+" "+ list2VisibleB + "list"}>
            <TextCircle text="Lorem ipsum"/>
            <TextCircle text="Lorem ipsum"/>
        </div>
        </div>
        <div onClick={() => setDiv2VisibleC(!list2VisibleC)}>
        <TextPlus text="helo"/>
        <div className={classNameGenerator("textcirclecont")+" "+ list2VisibleC + "list"}>
            <TextCircle text="Lorem ipsum"/>
            <TextCircle text="Lorem ipsum"/>
        </div>
        </div>
        </div>
    </div> 
    );
};

export default Resources;
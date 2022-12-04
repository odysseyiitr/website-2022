import React from "react";
import NavItem from "./NavItem"

const Filter = () => {
    return (
        <>
            <div className="filterDropDown">
                <div className="filter">
                    <div>
                        <p>Filter</p>
                    </div>
                    <div className="filterIcon">
                        <img src="/images/filter_icon.svg" />
                    </div>

                </div>
                <div className="filterMenu">
                    <button className="easy"><div>easy</div></button>
                    <button className="medium"><div>medium</div></button>
                    <button className="hard"><div>hard</div></button>
                    <button className="claimed"><div>claimed</div></button>
                    <button className="unclaimed"><div>unclaimed</div></button>
                </div>
            </div>
        </>
    );
};

export default Filter;
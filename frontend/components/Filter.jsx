import React from "react";
import { useEffect, useState } from "react";

const Filter = () => {
    var margin = '-5.5rem';
    const [count, setCount] = useState(0);
    const [easy, setEasy] = useState();
    const [medium, setMedium] = useState();
    const [hard, setHard] = useState();
    const [claim, setClaim] = useState();
    const [unclaim, setUnclaim] = useState();
    useEffect(() => {
        if (count != 0)                                             //currently the when a filter is selected the drop down moves a little right
            margin = "-4.5rem"                                      //so this was applied to change the css of the dropdown menu cause no better fix 
        else                                                        //came to mind the value of margin is changing but it not refected in inspect element
            margin = "-5.5rem"
        console.log(margin);
    }, [count]);
    return (
        <>
            <div className="filterDropDown">                         {/* the pink orb showing the number of filters applied */}
                {count != 0 ? (
                    <span class="dot" >{count}</span>
                ) : (
                    <>
                    </>
                )}
                <div className="filter">

                    <div>
                        <p>Filter</p>
                    </div>
                    <div className="filterIcon">
                        <img src="/images/filter_icon.svg" />
                    </div>

                </div>
                <div className="filterMenu" style={{ marginLeft: margin }}>
                    <button className="easy"
                        style={{ background: easy }}                                       //different names given to background of each button for togglig
                        onClick={() => {
                            if (easy == undefined) { setEasy("#E95F8D"); setCount(count + 1) }  //function changes the color of the div everytime it is 
                            else { setEasy(); setCount(count - 1) }                             // clicked and accordingly the count is altered             
                        }}>                                                                      {/* //the rest of the four buttons are also similar */}
                        <div>easy</div>                                                         
                    </button>                                                                   
                    <button className="medium"
                        style={{ background: medium }}
                        onClick={() => {
                            if (medium == undefined) { setMedium("#E95F8D"); setCount(count + 1) }
                            else { setMedium(); setCount(count - 1) }
                        }}>
                        <div>medium</div>
                    </button>
                    <button className="hard"
                        style={{ background: hard }}
                        onClick={() => {
                            if (hard == undefined) { setHard("#E95F8D"); setCount(count + 1) }
                            else { setHard(); setCount(count - 1) }
                        }}>
                        <div>hard</div>
                    </button>
                    <button className="claimed"
                        style={{ background: claim }}
                        onClick={() => {
                            if (claim == undefined) { setClaim("#E95F8D"); setCount(count + 1) }
                            else { setClaim(); setCount(count - 1) }
                        }}>
                        <div>claimed</div>
                    </button>
                    <button className="unclaimed"
                        style={{ background: unclaim }}
                        onClick={() => {
                            if (unclaim == undefined) { setUnclaim("#E95F8D"); setCount(count + 1) }
                            else { setUnclaim(); setCount(count - 1) }
                        }}>
                        <div>unclaimed</div>
                    </button>
                </div>
            </div>
        </>
    );
};

export default Filter;

import React, { useState, useEffect, cloneElement } from "react";
import database from "../firebase";
import WhiteButton from "./whiteButton";
import Geolocation from "./Geolocation";

import { use100vh } from 'react-div-100vh';
import { useHistory } from "react-router-dom";


//css
//import "../styles/Question.css";


let gradients = {
    1: 'linear-gradient(#FDB872, #FCA870, #FC986F)',
    2: 'linear-gradient(#FC986F, #FC866E, #FB786C)',
    3: 'linear-gradient(#FB786C, #FB686B, #F36E78)',
    4: 'linear-gradient(#F36E78, #E87689, #E07D96)',
    5: 'linear-gradient(#E07D96, #D685A7, #CD8CB4)',
    6: 'linear-gradient(#CD8CB4, #C195C7, #B89CD6)',
    7: 'linear-gradient(#B89CD6, #ACA5E9, #C195C7)',
    8: 'linear-gradient(#C195C7, #CD8CB4, #D685A7)'};

//props.question 1 is the first question
function SpecificQuest(props){
    const fullHeight = use100vh();
    let history = useHistory();

    const [q1Buttons, setQ1Buttons] = useState([false, false]); //yes, no
    const [q2Buttons, setQ2Buttons] = useState([false, false, false, false]); //1, 5, 10, 15
    const [q3Buttons, setQ3Buttons] = useState([false, false, false]); //$, $$, $$$
    const [q4Buttons, setQ4Buttons] = useState([false, false, false, false]); //opt1, opt2, opt3, opt4
    const [q6Buttons, setQ6Buttons] = useState([false, false, false, false, false]); //5, 10, 15, 20, rand
    const [groupCode, setGroupCode] = useState(0);
    const [q5Buttons, setQ5Buttons] = useState(
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]);


    const handleButtonClick = (clicked, info, id) => {
        if(clicked){
            //location 
            if(props.question == 1){
                //yes
                if (id === 0){
                    if(props.oldVal === false){
                        console.log("Got here");
                        setQ1Buttons([true, false]);
                        props.parentCallBack(true, 1);
                    }
                }
                //no
                else{
                    if(props.oldVal == false){
                        setQ1Buttons([false, true]);
                        props.parentCallBack(false, 1);
                    }
                }
            }
            //miles within
            if(props.question == 2){
                if(props.oldVal == 0){
                    props.parentCallBack(info, 2);
                    let temp = q2Buttons;
                    temp[id] = true;
                    setQ2Buttons(temp);
                }
                else{
                    if(props.oldVal == info){
                        props.parentCallBack(0, 2);
                        let temp = q2Buttons;
                        temp[id] = false;
                        setQ2Buttons(temp);
                    }
                    else{
                        let temp = [false, false, false, false];
                        temp[id] = true;
                        setQ2Buttons(temp);
                        props.parentCallBack(info, 2);
                    }
                }
            }
            //spend amount
            if(props.question == 3){
                if(props.oldVal == 0){
                    props.parentCallBack(id+1, 3);
                    let temp = q3Buttons;
                    temp[id] = true;
                    setQ3Buttons(temp);
                }
                else{
                    if(props.oldVal == info){
                        props.parentCallBack(0, 3);
                        let temp = q3Buttons;
                        temp[id] = false;
                        setQ3Buttons(temp);
                    }
                    else{
                        let temp = [false, false, false];
                        temp[id] = true;
                        setQ3Buttons(temp);
                        // setMilesWithin(info);
                        props.parentCallBack(id+1, 3);
                    }
                }
            }
            //we want to eat at restaurant, etc
            if(props.question == 4){
                let curr = props.oldVal; //restuarant(0), fancy(1), fastFood(2), drinksDessert(3)
                let temp = q4Buttons; //check button presses
                if(temp[id]){
                    for( var i = 0; i < curr.length; i++){ 
                        if ( curr[i] === id) { 
                            curr.splice(i, 1); 
                        }
                    }
                    temp[id] = false;
                }
                else{
                    curr.push(id);
                    temp[id] = true;
                    if(curr.length > 3){
                        let removed = curr.shift();
                        temp[removed] = false;
                    }
                }
                setQ4Buttons(temp);
                props.parentCallBack(curr, 4);
            }
            //additional filters
            if(props.question == 5){
                let temp = q5Buttons;
                let old = props.oldVal;
                temp[id] = !temp[id];
                setQ5Buttons(temp);
                props.parentCallBack(temp, 5);
            }
            //num options to choose from
            if(props.question == 6){
                if(props.oldVal === 0){
                    props.parentCallBack(info, 6);
                    let temp = q6Buttons;
                    temp[id] = true;
                    setQ6Buttons(temp);
                    console.log("The info: "+ info);
                }
                else{
                    if(props.oldVal === info){
                        props.parentCallBack(0, 6);
                        let temp = q6Buttons;
                        temp[id] = false;
                        setQ6Buttons(temp);
                    }
                    else{
                        let temp = [false, false, false, false, false];
                        temp[id] = true;
                        setQ6Buttons(temp);
                        props.parentCallBack(info, 6);
                        console.log(temp);
                    }
                }
            }
        }
    };


    const handleLocation = () => {
        var latitude, longitude;
        navigator.geolocation.getCurrentPosition(function(position) {
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;
        //   setLongitude(longitude);
        //   setLatitude(latitude);
        });
    };


    const handleSubmit = () => {
        database
          .ref(`groups/308/answers`)
          .set(0)
          .then(() => {
            alert("Question 1 was answered💫");
          })
          .catch((error) => {
            alert(error.message);
          });
    };

    const createGroup = () => {
        // props.parentCallBack(groupCode);
        if(groupCode == 0){
            var code = Math.floor(Math.random() * Math.floor(10000));
            console.log("Before call: " + code);
            setGroupCode(code);
            props.parentCallBack(code);
        }
        console.log("end of create group code is: " + groupCode);
    };

    const handleVote = () => {
        if(groupCode !== 0){
            props.parentCallBack2(groupCode);
            //history.push(`/${groupCode}`);
            // history.push('/2420');
        }
    };
    
    const testChange = () => {
        console.log("Test");
    };

    // if(props.question === 0){
    //     let val = "sdfsfd";
    //     return (
    //         <div style={{backgroundImage: gradients[props.question].gradient}} class="flex w-full w-screen justify-center flex-col justify-around items-center">
    //             <div style={{height: fullHeight}} class="flex flex-col w-full w-screen justify-around">
    //                 <p class="text-white text-3xl text-center">There are<br></br>people in my group</p>
    //                 <div class="w-full flex flex-col items-center">
    //                     <input placeholder='Something' style={{background: 'rgba(255, 255, 255, 0.5)', color: 'black'}} 
    //                         onChange={(e) => console.log(e.target.value)}
    //                         class="border-4 border-white mb-8 h-12 w-1/5 rounded-full text-md"
    //                     ></input>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // }
    if(props.question === 1){
        return (
            <div>
                <div style={{backgroundImage: gradients[props.question]}} class="flex w-screen justify-center w-full flex-col items-center">
                    <div style={{margin: "0 auto", width: "55%", height: fullHeight}} class="flex flex-col sm:w-1/2 justify-around">
                        <p class="text-white text-2xl text-center">
                            We want to eat in <br></br> AUTOFILL HERE
                        </p>

                        <p class="text-white text-center">
                            or
                        </p>

                        <p class="text-white text-2xl text-center">
                            Use my location
                        </p>
                        <div class="flex">
                            <WhiteButton parentCallBack={handleButtonClick} text="✅" id={0} pressed={q1Buttons[0]} buttonLength="5/6" divLength="1/5"/>
                            <WhiteButton parentCallBack={handleButtonClick} text="❌" id={1} pressed={q1Buttons[1]} buttonLength="5/6" divLength="1/5"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    else if(props.question === 2){
        return (
            <div style={{backgroundImage: gradients[props.question]}} class="flex w-screen justify-center">
                <div style={{height: fullHeight}} class="ml-3 mr-3 pt-1 flex-col flex justify-around sm:w-1/2">
                    <p class="text-white text-2xl text-center">The place should be within ________ miles from me.</p>
                    <div class="flex">
                        <WhiteButton parentCallBack={handleButtonClick} id={0} text={1} pressed={q2Buttons[0]} buttonLength="4/6" divLength="1/5"/>
                        <WhiteButton parentCallBack={handleButtonClick} id={1} text={5} pressed={q2Buttons[1]} buttonLength="4/6" divLength="1/5"/>
                        <WhiteButton parentCallBack={handleButtonClick} id={2} text={10} pressed={q2Buttons[2]} buttonLength="4/6" divLength="1/5"/>
                        <WhiteButton parentCallBack={handleButtonClick} id={3} text={15} pressed={q2Buttons[3]} buttonLength="4/6" divLength="1/5"/>
                    </div>
                </div>
            </div> 
        );
    }
    else if(props.question === 3){
        return (
            <div>
                <div style={{backgroundImage: gradients[props.question]}} class="flex w-screen justify-center">
                    <div style={{height: fullHeight}} class="ml-3 mr-3 pt-1 flex-col flex justify-around sm:w-1/2">
                        <p class="text-white text-2xl text-center">We want to spend</p>
                        <div class="flex">
                            <WhiteButton parentCallBack={handleButtonClick} id={0} text="$" pressed={q3Buttons[0]} buttonLength="4/6" divLength="1/5"/>
                            <WhiteButton parentCallBack={handleButtonClick} id={1} text="$$" pressed={q3Buttons[1]} buttonLength="4/6" divLength="1/5"/>
                            <WhiteButton parentCallBack={handleButtonClick} id={2} text="$$$" pressed={q3Buttons[2]} buttonLength="4/6" divLength="1/5"/>
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
    else if(props.question === 4){
        return (
            <div>
                <div style={{backgroundImage: gradients[props.question]}} className="flex w-screen justify-center">
                    <div style={{height: fullHeight}} className="ml-3 mr-3 pt-1 flex-col flex justify-around sm:w-1/2">
                        <p class="text-white text-2xl text-center">We want to eat at a</p>
                        <div class="flex justify-center">
                            <WhiteButton parentCallBack={handleButtonClick} id={0} text="Restaurant" pressed={q4Buttons[0]} buttonLength="5/6" divLength="4/5"/><br></br>
                        </div>
                        <div class="flex justify-center">
                            <WhiteButton parentCallBack={handleButtonClick} id={1} text="Fancy Dine-In" pressed={q4Buttons[1]} buttonLength="5/6" divLength="4/5"/><br></br>
                        </div>
                        <div class="flex justify-center">
                            <WhiteButton parentCallBack={handleButtonClick} id={2} text="Fast Food" pressed={q4Buttons[2]} buttonLength="5/6" divLength="4/5"/><br></br>
                        </div>
                        <div class="flex justify-center">
                            <WhiteButton parentCallBack={handleButtonClick} id={3} text="Drinks & Desserts" pressed={q4Buttons[3]} buttonLength="5/6" divLength="5/5"/><br></br>
                        </div>
                        <p class="text-white text-center">Choose up to 3.</p>
                    </div>
                </div>
                
            </div>
        );
    }
    else if(props.question === 5){
        return (
            <div>
                <div style={{backgroundImage: gradients[props.question]}} className="flex w-screen justify-center">
                    <div style={{height: fullHeight}} className="ml-2 mr-2 pt-1 flex-col flex justify-around sm:w-1/2">
                        <p class="text-white text-2xl text-center">Additional filters (Optional)</p>
                        <div class="flex">
                            <WhiteButton parentCallBack={handleButtonClick} id={0} text="🇯🇵" pressed={q5Buttons[0]} buttonLength="4/6" divLength="1/5"/>
                            <WhiteButton parentCallBack={handleButtonClick} id={1} text="🇰🇷" pressed={q5Buttons[1]} buttonLength="4/6" divLength="1/5"/>
                            <WhiteButton parentCallBack={handleButtonClick} id={2} text="🇨🇳" pressed={q5Buttons[2]} buttonLength="4/6" divLength="1/5"/>
                            <WhiteButton parentCallBack={handleButtonClick} id={3} text="🇮🇳" pressed={q5Buttons[3]} buttonLength="4/6" divLength="1/5"/>
                            <WhiteButton parentCallBack={handleButtonClick} id={4} text="🇻🇳" pressed={q5Buttons[4]} buttonLength="4/6" divLength="1/5"/>
                            <WhiteButton parentCallBack={handleButtonClick} id={5} text="🇲🇽" pressed={q5Buttons[5]} buttonLength="4/6" divLength="1/5"/>
                            <WhiteButton parentCallBack={handleButtonClick} id={6} text="🇹🇭" pressed={q5Buttons[6]} buttonLength="4/6" divLength="1/5"/>
                            <WhiteButton parentCallBack={handleButtonClick} id={7} text="🇺🇸" pressed={q5Buttons[7]} buttonLength="4/6" divLength="1/5"/>
                            <WhiteButton parentCallBack={handleButtonClick} id={8} text="🇮🇹" pressed={q5Buttons[8]} buttonLength="4/6" divLength="1/5"/>
                        </div>
                        <div class="flex">
                            <WhiteButton parentCallBack={handleButtonClick} id={9} text="🥞" pressed={q5Buttons[9]} buttonLength="4/6" divLength="1/5"/>
                            <WhiteButton parentCallBack={handleButtonClick} id={10} text="🍤" pressed={q5Buttons[10]} buttonLength="4/6" divLength="1/5"/>
                            <WhiteButton parentCallBack={handleButtonClick} id={11} text="🥬" pressed={q5Buttons[11]} buttonLength="4/6" divLength="1/5"/>
                            <WhiteButton parentCallBack={handleButtonClick} id={12} text="☕️" pressed={q5Buttons[12]} buttonLength="4/6" divLength="1/5"/>
                            <WhiteButton parentCallBack={handleButtonClick} id={13} text="🥪" pressed={q5Buttons[13]} buttonLength="4/6" divLength="1/5"/>
                            <WhiteButton parentCallBack={handleButtonClick} id={14} text="🥧" pressed={q5Buttons[14]} buttonLength="4/6" divLength="1/5"/>
                        </div>
                        <p class="text-white text-center">Keep swiping if you would like to skip this step.</p>
                    </div>
                </div>
                
            </div>
        );
    }
    else if(props.question === 6){
        return (
            <div>
                <div style={{backgroundImage: gradients[props.question]}} className="flex w-screen justify-center">
                    <div style={{height: fullHeight}} className="ml-2 mr-2 pt-1 flex-col flex justify-around sm:w-1/2">
                        <p class="text-white text-2xl text-center">We want ________ options to choose from.</p>
                        <div class="flex justify-center">
                            <WhiteButton parentCallBack={handleButtonClick} id={0} text={5} pressed={q6Buttons[0]} buttonLength="4/6" divLength="1/5"/><br></br>
                            <WhiteButton parentCallBack={handleButtonClick} id={1} text={10} pressed={q6Buttons[1]} buttonLength="4/6" divLength="1/5"/><br></br>
                            <WhiteButton parentCallBack={handleButtonClick} id={2} text={15} pressed={q6Buttons[2]} buttonLength="4/6" divLength="1/5"/><br></br>
                            <WhiteButton parentCallBack={handleButtonClick} id={3} text={20} pressed={q6Buttons[3]} buttonLength="4/6" divLength="1/5"/><br></br>
                        </div>
                        <div class="flex justify-center">
                            <WhiteButton parentCallBack={handleButtonClick} id={4} text="random" pressed={q6Buttons[4]} buttonLength="3/6" divLength="2/5"/><br></br>
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
    else{
        let groupButtonMessage = groupCode === 0 ? "Create Group Code!" : groupCode;
        let pressed = groupCode === 0 ? false : true;
            return (
                <div>
                    <div style={{backgroundImage: gradients[props.question]}} className="flex w-screen justify-center">
                        <div style={{height: fullHeight}} className="ml-2 mr-2 pt-1 flex-col flex justify-around sm:w-1/2">
                            <p class="text-white text-2xl text-center">Thank you for your responses. Now it's time to reach a consensus!</p>
                            {groupCode !== 0 ? <p class="text-white text-center">Share this code with your Group!</p> : <p></p>}
                            <div class="justify-center flex">
                                <WhiteButton parentCallBack={createGroup} id={-1} text={groupButtonMessage} pressed={pressed} buttonLength="5/6" divLength="3/5"/>
                                <WhiteButton parentCallBack={handleVote} id={-1} text="Start Voting!" pressed={false} buttonLength="5/6" divLength="3/5"/>
                            </div>
                        </div>
                    </div>
                </div>
            );
        // }
    }
}export default SpecificQuest;
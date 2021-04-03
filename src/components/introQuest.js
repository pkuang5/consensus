import React, { useState, useEffect, cloneElement } from "react";
import database from "../firebase";
import Button from "./Button";
import Progress from "react-progressbar";
import WhiteButton from './whiteButton';
import { use100vh } from 'react-div-100vh'

//css
import "../styles/Question.css";

function IntroQuest(props){
    const fullHeight = use100vh();
    const handleKeyDown = () => {
        console.log("pressed");
    };

    const [pressed, setPressed] = useState(false);

    // return (
    //     <div className="w-full flex flex-col items-center">
    //         <div className="ml-6 pt-1 flex-col w-screen justify-center">
    //             <p class="text-white text-2xl text-center">
    //             Let's get started! Here are a couple questions to help us provide your group with the best options! The next few questions will help us provide your group with the best options! Swipe up to move to the next question!
    //             </p>
    //         </div>
    //         {/* <WhiteButton text="Let's Go!" pressed={pressed}/> */}
    //     </div>
    // );
    return (
        <div>
            <div style={{backgroundImage: 'linear-gradient(#FDB872, #FCA870, #FC986F)'}} class="w-full flex h-full flex-col items-center">
                <div style={{height: fullHeight}} class="ml-6 pt-1 flex-col w-screen justify-center">
                    <p class="text-white text-3xl text-center">Let's get started! Here are a couple questions to help us provide your group with the best options! The next few questions will help us provide your group with the best options! Swipe up to move to the next question!</p>
                </div>
            </div>
            
        </div>
    );
    
}   
export default IntroQuest;
import React, { useState, useEffect, cloneElement } from "react";
import database from "../firebase";
import Button from "./Button";
import Progress from "react-progressbar";

//css
import "../styles/Question.css";

function SpecificQuest(){
    //const intro = "Let's get started! Here are a couple questions to help us provide your group with the best options! The next few questions will help us provide your group with the best options! Swipe up to move to the next question!";
    render() {
        return (
            <div className="text-page max-w-md flex mx-auto p-6 mt-10 rounded-lg">
                <div className="ml-6 pt-1">
                    <p className="text-question text-base text-black-700 leading-normal text-center">
                    Let's get started! Here are a couple questions to help us provide your group with the best options! The next few questions will help us provide your group with the best options! Swipe up to move to the next question!
                    </p>
                </div>
            </div>
          );
    }
}
export default SpecificQuest;
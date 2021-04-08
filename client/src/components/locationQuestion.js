import React, { useState, useEffect, cloneElement } from "react";
import database from "../firebase";
import Button from "./Button";
import Progress from "react-progressbar";

//css
import "../styles/Question.css";
import { ButtonNext } from "pure-react-carousel";

function LocationQuestion(props){
    const questions = [
        "This place should be within _______ miles from me.", 
        "We want to eat in"
    ];

    return (
        <div>
            <div className="text-page max-w-md flex mx-auto p-6 mt-10 rounded-lg">
                <div className="ml-6 pt-1">
                    <p className="text-question text-base text-black-700 leading-normal text-center">
                        {props.decision ? questions[0] : questions[1]}
                    </p>
                </div>
                <div>
            {props.decision ? (
                <div>
                    <Button buttonName="1"></Button>
                    <Button buttonName="5"></Button>
                </div>
            ) : (
                <div>
                    <input
                    className="text-input field"
                    id="input"
                    type="text"
                    class="border rounded-md w-10 text-center"
                    placeholder="State"></input>

                    <input
                    className="text-input field"
                    id="input"
                    type="text"
                    class="border rounded-md w-10 text-center"
                    placeholder="City"></input>
                </div>
            )}
            </div>
            </div>
        </div>
    );
}   
export default LocationQuestion;
import React, { useState, useEffect, cloneElement } from "react";


//css
import "../styles/Question.css";

function WhiteButton(props){
    let transparent = 'rgba(255, 255, 255, 0.5)';
    let opaque = 'rgba(255, 255, 255, 255)';
    let buttonInfo = props.text;
    

    //when pressed, send back info back to page that button was clicked
    const handleClick = () => {
        //props.id == -1 means its part of the last page
        if(props.id === -1){
            if(buttonInfo === "Create Code!" || buttonInfo === "Start Voting!"){
                props.parentCallBack();
            }
        }
        else{
            props.parentCallBack(true, buttonInfo, props.id);
        }
    };

    let buttonLength = `h-12 w-${props.buttonLength} border-4 border-white rounded-full flex items-center justify-center`
    let divLength = `w-${props.divLength} flex flex-col items-center`;
    return (
        <div class={divLength}>
            <div style={{background: props.pressed ? opaque : transparent, color: 'black', fontWeight: '600', fontSize: '1.25rem', lineHeight: '1.75rem'}} 
                onClick={() => handleClick()} 
                class={buttonLength}>
                <p style={{color: "#F36E78"}}>{buttonInfo}</p>
            </div>
        </div>
    );
}   
export default WhiteButton;
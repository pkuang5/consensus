import React, { useState, useEffect, cloneElement } from "react";

function Input(props){
    

    //when pressed, send back info back to page that button was clicked
    const handleClick = (e) => {
        console.log("Clicked");
    };

    return (
        <div>
    <div class="flex w-screen justify-center">
        <div class="w-full sm:w-1/2 flex flex-col justify-around">
            <div class="w-full flex flex-col items-center">
                <input placeholder='testing testing' style={{background: 'rgba(255, 255, 255, 0.5)'}} 
                        onKeyDown={(e) => handleClick(e)} 
                        class="border-4 border-white mb-8 h-12 w-4/5 rounded-full text-md">
                </input>
            </div>
        </div>
    </div>
    {/* <div class="w-full flex flex-col items-center">
        <div style={{background: props.pressed ? opaque : transparent, color: 'black', fontWeight: '600', fontSize: '1.25rem', lineHeight: '1.75rem'}} 
            onClick={() => handleClick()} 
            class="h-12 w-2/5 border-4 border-white rounded-full flex items-center justify-center">
            
        </div>
    </div> */}
        </div>

    );
}   
export default Input;
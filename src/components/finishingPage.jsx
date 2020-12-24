import React, { useState, useEffect } from "react";
import groupArrows from '../svg/Grouparrows.svg'
import database from "../firebase";
import { isPropertySignature } from "typescript";


function FinishingPage(props) {

    const [entered, setEntered] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('phoneEntered'+props.groupCode)) setEntered(true)
    }, [])

    const saveNumber = (e) => {
        if (e.key === 'Enter') {
            database.ref(`groups/${props.groupCode}/numbers`).push(e.target.value)
            setEntered(true)
            localStorage.setItem('phoneEntered'+props.groupCode, true)
        }
    }

    return (
        <div class="h-screen w-screen flex items-center justify-around flex-col">
            <p class="text-4xl text-center text-white px-10">Waiting for your group finish swiping</p>
            <img class="w-2/3" src={groupArrows} />
            <div class="flex flex-col items-center w-full">
                <p class="text-2xl text-center text-white px-10">Text me results</p>
                {entered ? 
                <div style={{color: '#FF6600', fontWeight: '600', fontSize: '1.25rem', lineHeight: '1.75rem'}} class="bg-white h-12 w-4/5 border-4 border-white rounded-full flex items-center justify-center">number entered!</div>
                : 
                <input placeholder='enter phone number' style={{background: 'rgba(255, 255, 255, 0.5)'}} onKeyDown={(e) => saveNumber(e)} class="border-4 border-white h-12 w-4/5 rounded-full text-md"></input>}
            </div>
        </div>
    )

}

export default FinishingPage;

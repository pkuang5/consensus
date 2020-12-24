import React, { useState, useEffect } from "react";
import database from "../firebase";
import '../styles/FinishingPage.css'

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
        <div class="w-screen flex justify-center">
            <div class="h-screen w-screen sm:w-1/3 flex items-center justify-around flex-col">
                <p class="text-4xl text-center text-white px-10">Waiting for your group finish swiping</p>
                <svg id='arrows' class="w-1/2" width="298" height="316" viewBox="0 0 298 316" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M247.547 189.753C241.176 189.642 231.979 193.123 230.138 200.124C230.01 200.711 229.905 201.304 229.759 201.899C219.23 244.842 173.005 270.456 126.546 259.065C96.8912 251.794 74.3364 231.208 64.6229 206.098L76.5065 203.757C78.7112 200.927 79.9994 196.177 79.7511 190.93L40.7649 141.985L13.3372 203.952C14.1538 209.141 16.3527 213.196 19.0264 215.071L33.7069 212.183C46.323 247.892 77.7876 277.42 119.528 287.654C181.383 302.82 242.886 270.074 259.408 214.149C261.521 205.548 258.93 189.972 247.538 189.772" fill="white" fill-opacity="0.97"/>
                    <path d="M50.2798 126.104C56.6511 126.198 65.8402 122.75 67.6808 115.731C67.8172 115.142 67.9206 114.558 68.0676 113.958C78.5997 71.0025 124.821 45.4009 171.281 56.7921C200.939 64.0639 223.486 84.6655 233.203 109.776L221.319 112.122C219.12 114.927 217.837 119.687 218.078 124.932L257.06 173.893L284.494 111.885C283.677 106.7 281.479 102.658 278.804 100.77L264.121 103.653C251.523 67.9528 220.039 38.4197 178.299 28.1856C116.444 13.0197 54.9367 45.7825 38.4182 101.691C36.3007 110.295 38.889 125.883 50.2888 126.068" fill="white" fill-opacity="0.97"/>
                </svg>
                <div class="flex flex-col items-center w-full">
                    <p class="text-2xl text-center text-white px-10">Text me results</p>
                    {entered ? 
                    <div style={{color: '#FF6600', fontWeight: '600', fontSize: '1.25rem', lineHeight: '1.75rem'}} class="bg-white h-12 w-4/5 border-4 border-white rounded-full flex items-center justify-center">number entered!</div>
                    : 
                    <input placeholder='enter phone number' style={{background: 'rgba(255, 255, 255, 0.5)'}} onKeyDown={(e) => saveNumber(e)} class="border-4 border-white h-12 w-4/5 rounded-full text-md"></input>}
                </div>
            </div>
        </div>
    )

}

export default FinishingPage;

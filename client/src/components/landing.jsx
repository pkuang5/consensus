import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { use100vh } from 'react-div-100vh'

function Landing(props) {
    let history = useHistory();
    const height = use100vh()

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            history.push(`/${event.target.value}`)  
        }
      }

    return (
        <div style={{backgroundImage: 'linear-gradient(#FEDD7D, #FDCB74, #FDB872)'}} class="flex w-screen justify-center">
            <div style={{height: height}}class="w-full sm:w-1/2 flex flex-col justify-around">
                <p style={{fontFamily: 'Futura',
                            fontStyle: 'normal',
                            fontWeight: '500',
                            fontSize: '50px',
                            lineHeight: '66px'}} class="text-center">consensus</p>
                <p class="font-bold text-white text-2xl text-center">group decisions<br></br>make sense with<br></br>Consensus</p>
                <div class="w-full flex flex-col items-center">
                    <svg class="absolute self-end" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16 32C24.8367 32 32 24.8365 32 16C32 7.16345 24.8367 0 16 0C7.16333 0 0 7.16345 0 16C0 24.8365 7.16333 32 16 32ZM26.3535 15.6465L23.1716 12.4645C22.9763 12.2692 22.6597 12.2692 22.4644 12.4645C22.2693 12.6597 22.2693 12.9763 22.4644 13.1716L24.793 15.5H7V16.5H24.793L22.4644 18.8284C22.2693 19.0237 22.2693 19.3402 22.4644 19.5355C22.6597 19.7308 22.9763 19.7308 23.1716 19.5355L26.3535 16.3535C26.5488 16.1583 26.5488 15.8417 26.3535 15.6465Z" fill="white"/>
                    </svg>
                    <input placeholder='# enter group code' style={{background: 'rgba(255, 255, 255, 0.5)'}} onKeyDown={(e) => handleKeyDown(e)} class="border-4 border-white mb-8 h-12 w-4/5 rounded-full text-md"></input>
                    <div style={{background: 'rgba(255, 255, 255, 0.5)',color: '#FDB872', fontWeight: '600', fontSize: '1.25rem', lineHeight: '1.75rem'}} onClick={() => history.push('/qs')} class="h-12 w-4/5 border-4 border-white rounded-full flex items-center justify-center">create a group</div>
                </div>
            </div>
        </div>
    )

}

export default Landing;

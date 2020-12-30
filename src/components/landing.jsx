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
        <div style={{height: height, backgroundImage: 'linear-gradient(#FEDD7D, #FDCB74, #FDB872)'}}class="w-screen grid grid-cols-1 grid-rows-4">
            <p style={{fontFamily: 'Futura',
                        fontStyle: 'normal',
                        fontWeight: '500',
                        fontSize: '50px',
                        lineHeight: '66px'}} class="text-center mt-10">consensus</p>
            <p class="font-bold text-white text-2xl text-center">group decisions<br></br>make sense with<br></br>Consensus</p>
            <div class="w-full flex flex-col items-center">
                <input placeholder='# enter group code' style={{background: 'rgba(255, 255, 255, 0.5)'}} onKeyDown={(e) => handleKeyDown(e)} class="border-4 border-white mb-8 h-12 w-4/5 rounded-full text-md"></input>
                <div style={{background: 'rgba(255, 255, 255, 0.5)',color: '#FF6600', fontWeight: '600', fontSize: '1.25rem', lineHeight: '1.75rem'}} onClick={() => history.push('/search')} class="h-12 w-4/5 border-4 border-white rounded-full flex items-center justify-center">create a group</div>
            </div>
        </div>
    )

}

export default Landing;

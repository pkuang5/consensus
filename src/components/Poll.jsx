import React, { useState, useEffect } from "react";
import database from '../firebase'
import Deck from './Deck'
import Loader from './loader'
import ProgressBar from '@ramonak/react-progress-bar';
import { use100vh } from 'react-div-100vh'

function Poll(props) {
    const height = use100vh()
    const [data, setData] = useState([])
    const [progressPercentage, setProgressPercentage] = useState(0)

    useEffect(() => {
        var arr = []
        database.ref(`groups/${props.groupCode}`).once("value", (snapshot) => {
            snapshot.forEach((data) => {
                arr.push(data.val())
            })
            setData(data.concat(arr))
        })
    }, [props.groupCode])

    if (data.length == 0) return <div style={{height: height}} class="flex items-center justify-between"><Loader loading={true} /></div>
    else return (
        <React.Fragment>
            <div class="flex flex-col items-center poll">
                <p class="text-4xl absolute text-center mt-5 font-bold">consensus</p>
                <Deck groupCode={props.groupCode} data={data} setProgressPercentage={(percent) => setProgressPercentage(percent)}/>
            </div>
            <ProgressBar bgcolor='rgba(255, 255, 255, 0.6)' baseBgColor='rgba(255, 255, 255, 0.3)' labelSize='0px' borderRadius='0px' completed={progressPercentage}/>
        </React.Fragment>
    )
}

export default Poll;

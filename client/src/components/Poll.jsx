import React, { useState, useEffect } from "react";
import database from '../firebase'
import Deck from './Deck'
import Loader from './loader'
import ProgressBar from '@ramonak/react-progress-bar';
import { use100vh } from 'react-div-100vh'
import { useHistory } from "react-router-dom";

function Poll(props) {
    const height = use100vh()
    let history = useHistory()
    const [data, setData] = useState([])
    const [progressPercentage, setProgressPercentage] = useState(0)
    const [progress, setProgress] = useState(0)
    const [finished, setFinished] = useState(false)

    useEffect(() => {
        if (finished) {
            database
            .ref(`groups/${props.groupCode}/numOfVotes`)
            .transaction(function (vote) {
            return (vote || 0) + 1;
            });
            history.push(`/${props.groupCode}/results`)
        } 
        var arr = []
        database.ref(`groups/${props.groupCode}/data`).once("value", (snapshot) => {
            snapshot.forEach((data) => {
                arr.push(data.val())
            })
            setData(data.concat(arr))
        })
        if (!localStorage.getItem('lastCard'+props.groupCode)) localStorage.setItem('lastCard'+props.groupCode,0)
        var progress = parseInt(localStorage.getItem('lastCard'+props.groupCode))
        setProgress(progress)
        setProgressPercentage(progress * 10)
        if (progress == 10) setFinished(true)
    }, [props.groupCode, finished])

    if (data.length == 0) return <div style={{height: height}} class="flex items-center justify-between"><Loader loading={true} /></div>
    else return (
        // finished ? 
        //     <FinishingPage groupCode={props.groupCode} />
        //     :
        <React.Fragment>
            <div class="flex flex-col items-center poll">
                <p class="text-4xl absolute text-center mt-5 font-bold">consensus</p>
                <Deck progress={progress} groupCode={props.groupCode} data={data.slice(0,data.length - progress)} setFinished={bool => setFinished(bool)} setProgressPercentage={(percent) => setProgressPercentage(percent)}/>
            </div>
            <ProgressBar bgcolor='rgba(255, 255, 255, 0.6)' baseBgColor='rgba(255, 255, 255, 0.3)' labelSize='0px' borderRadius='0px' completed={progressPercentage}/>
        </React.Fragment>
    )
}

export default Poll;

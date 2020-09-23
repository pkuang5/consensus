import React, { useState, useEffect } from "react";
import database from '../firebase'
import Deck from './Deck'
import Loader from './loader'
import Progress from 'react-progressbar'

function Poll(props) {
    const [data, setData] = useState([])
    const [progressPercentage, setProgressPercentage] = useState(0)

    useEffect(() => {
        var arr = []
        database.ref(`groups/${props.groupCode}`).once("value", (snapshot) => {
            snapshot.forEach((data) => {
                let item = {
                    id: data.key,
                    name: data.val().name,
                    photos: data.val().photos,
                    lat: data.val().lat,
                    lng: data.val().lng
                }
                arr.push(item)
            })
            console.log(arr)
            setData(data.concat(arr))
        })
    }, [props.groupCode])

    if (data.length == 0) return <Loader loading={true} />
    else return (
        <React.Fragment>
            <Progress completed={progressPercentage} />
            <div class="flex flex-col items-center">
                <p class="text-4xl absolute text-center mt-5">consensus</p>
                <Deck groupCode={props.groupCode} data={data} setProgressPercentage={(percent) => setProgressPercentage(percent)}/>
            </div>
        </React.Fragment>
    )

}

export default Poll
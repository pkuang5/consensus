import React, { useState, useEffect } from "react";
import database from '../firebase'
import Deck from './Deck'
import Loader from './loader'

function Poll(props) {
    const [data, setData] = useState([])

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
        <Deck groupCode={props.groupCode} data={data} />
    )

}

export default Poll
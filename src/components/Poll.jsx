import React, { useState, useEffect } from "react";
import database from '../firebase'
import Deck from './Deck'

function Poll(props){
    const [data, setData] = useState([])

    useEffect(() => {
        var arr = []
        database.ref(`groups/${props.groupCode}`).once("value", (snapshot) => {
          snapshot.forEach((data) => {
            let item = {
              id: data.key,
              name: data.val().name,
              photos: data.val().photos
            }
            arr.push(item)
          })
          setData(data.concat(arr))
        })
      }, [props.groupCode])

    if (data.length == 0) return null
    else return <Deck groupCode={props.groupCode} data={data} />

}

export default Poll
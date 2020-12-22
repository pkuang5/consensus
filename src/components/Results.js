import React, { useState, useEffect } from "react";
import { Transition, animated } from 'react-spring'
import database from '../firebase';
import { useSprings } from "react-spring/hooks";
import ReactDOM from 'react-dom'

import '../styles/Results.css'



function Place({i, data}){
    const { name, vote } = data[i];
    var state = { show: true };
    if (i <= 2){
        return (
            <div>
                <Transition
                    native
                    items={state.show}
                    from={{ overflow: 'hidden', height: 0 }}
                    enter={[{ height: 'auto' }]}
                    leave={{ height: 0 }}>
                    {show =>
                        show && (props => <animated.div style={props}>
                            <div style = {{ height : 70, borderRadius : '10px', background : 'lightgreen', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                <div style = {{overflow: 'hidden', width: '100%' , color: 'white' , display: 'flex' , justifyContent: 'center', alignItems: 'center', fontSize: '2em', fontFamily: "'Kanit', sans-serif", textTransform: 'uppercase'}}>
                                    {name} with a vote of {vote}
                                </div>
                            </div>
                        </animated.div>)
                    }
                </Transition>
                <div style = {{height : 20}}/>
            </div>
        );
    } else {
        return(
            <div/>
        );
    }
}

function Results(props) {

    const [data, setData] = useState([])

    useEffect(() => {
        var arr = []
        database.ref(`groups/${props.groupCode}`).once("value", (snapshot) => {
            snapshot.forEach((data) => {
                arr.push(data.val())
            })
            arr.sort((a,b) => b.vote - a.vote)
            setData(data.concat(arr))
        })
    }, [props.groupCode])
    
    return(
        <div class="h-screen w-screen" style = {{ background : 'lightyellow', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            {data.map(({}, i) => (
                <Place
                    i = {i}
                    data = {data}
                />
            ))}
        </div>
    );
}

export default Results;
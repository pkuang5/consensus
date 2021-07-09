import React, { useState, useEffect } from "react";
import { Transition, animated } from 'react-spring'
import database from '../firebase';
import Loader from "./loader"
import ProgressBar from "./ProgressBar";

import '../styles/Results.css'

function Place({data, numofvotes}){
    const { name, photos, url, vote } = data;
    console.log(data)
    var state = { show: true };
    var percent = Math.round((vote/numofvotes)*100);

    console.log(numofvotes)

    function goToYelp() {
        var win = window.open(url, '_blank');
        win.focus();
    }

        return (
            <div>
                <div style={{height: 1}}/>
                <div className = "spaceforvote">
                    <div>
                        <Transition
                            native
                            items={state.show}
                            from={{ overflow: 'hidden', height: 0 }}
                            enter={[{ height: 'auto' }]}
                            leave={{ height:  0}}>
                            {show =>
                                show && (props => <animated.div style={props}>
                                    <div id = 'circle'>
                                        {photos.map((pic, index)=> (
                                            <img className="pictures" src={pic} key={index} alt="profilePicture" onClick={() => goToYelp()}/>
                                        ))}
                                    </div>
                                </animated.div>)
                            }
                        </Transition>
                        <Transition
                            native
                            items={state.show}
                            from={{ overflow: 'hidden', height: 0 }}
                            enter={[{ height: 'auto' }]}
                            leave={{ height: 0 }}>
                            {show =>
                                show && (props => <animated.div style={props}>
                                    <div className = 'textforname'>
                                        {name}
                                    </div>
                                </animated.div>)
                            }
                        </Transition>
                    </div>
                <div className="barandnum">
                    <ProgressBar bgcolor = "#ffa500" completed = {percent}/>
                    <div className="width"/>
                    <Transition
                    native
                    items={state.show}
                    from={{ overflow: 'hidden', height: 0 }}
                    enter={[{ height: 'auto' }]}
                    leave={{ height: 0 }}>
                    {show =>
                        show && (props => <animated.div style={props}>
                            <div className = 'votecount'>
                                {vote}
                            </div>
                        </animated.div>)
                    }
                    </Transition>
                </div>
                </div>
            </div>
        );
}

function Results(props) {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [numofvotes, setNumVotes] = useState(0)
    //const i = props.i

    useEffect(() => {
        // var arr = []
        database.ref(`groups/${props.groupCode}/data`).once("value", (snapshot) => {
            snapshot.forEach(item => {
                var temp = item.val()
                data.push(temp)
            })
            data.sort((a,b) => b.vote - a.vote)
            // setData(data.concat(arr))
            // console.log("arr")
            // console.log(arr)
            console.log("data")
            console.log(data)
            setLoading(false)
        })
        database.ref(`groups/${props.groupCode}/numOfVotes`).on('value', (snapshot) => {
            let temp = snapshot.val()
            console.log(temp)
            setNumVotes(temp)
        })
    }, [props.groupCode])

    function testforsimilar(data){
        var x = 1;
        var rand = Math.round(Math.random() * 100000000000);
        var num = 0;
        var test = [];
        for (let i = 0; i < 5; i++){
            //console.log(data[i])
            test.push(<Place data = {data[i]} numofvotes = {numofvotes}/>)
        }
        return test
    }

    // async function filldata(){
    //     database.ref(`groups/${props.groupCode}/data`).once("value", (snapshot) => {
    //         snapshot.forEach(item => {
    //             var temp = item.val()
    //             data.push(temp)
    //         })
    //         data.sort((a,b) => b.vote - a.vote)
    //         setLoading(false)
    //     })
    //     console.log(data)
    // }
    
    if (loading) return <Loader loading={true} />

    return(
        <div className = 'result' class = "h-screen" style={{backgroundImage: 'linear-gradient(#FEDD7D, #FDCB74, #FDB872)'}}>
            <div style={{height: 20}}/>
                <div style={{height: 20}}/>
                <div className = "textforhere">
                    Here are your results!
                </div>
                <div className = "textforinstruc">
                    click on the image for more restaurant info.
                </div>
            {/* <Place data = {data[0]}/> */}
            {testforsimilar(data)}
            <div className="peoplewhovoted">
                {numofvotes} people have voted
            </div>
        </div>
    );
}

export default Results;
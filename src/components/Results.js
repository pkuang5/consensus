import React, { useState, useEffect } from "react";
import { Transition, animated } from 'react-spring'
import database from '../firebase';
import Loader from "./loader"
import Carousel from "nuka-carousel";
import { useSprings } from "react-spring/hooks";
import ReactDOM from 'react-dom'

import '../styles/Results.css'
import { createNoSubstitutionTemplateLiteral } from "typescript";

function Place({data}){
    const { name, photos, url } = data;
    console.log(data)
    var state = { show: true };

    function goToYelp() {
        var win = window.open(url, '_blank');
        win.focus();
    }

        return (
            <div className = "result">
                <div style={{height: 20}}/>
                <div className = "textfortitle">
                    consensus
                </div>
                <div style={{height: 20}}/>
                <div className = "textforhere">
                    Here are your results!
                </div>
                <div className = "textforinstruc">
                    click on the image for more restaurant info.
                </div>
                <div style={{height: 20}}/>
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
                <div style={{height: 20}}/>
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
                <div style={{height: 50}}/>
                <div classname = "detailed">

                </div>
            </div>
        );
}

function Results(props) {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
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
    }, [props.groupCode])

    function testforsimilar(data){
        var x = 1;
        var rand = Math.round(Math.random() * 100000000000);
        var num = 0;
        var test = [];
        for (let i = 1; i < 10; i++){
            //console.log(data[i])
            if (data[0].vote === data[i].vote){
                x += 1;
                console.log(x)
            }
        }
        num = rand % x;
        console.log(rand);
        console.log(num)
        test.push(<Place data = {data[num]}/>)
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
        <div className = 'centered' class="flex w-screen h-screen justify-center" style={{backgroundImage: 'linear-gradient(#FEDD7D, #FDCB74, #FDB872)'}}>
            {/* <Place data = {data[0]}/> */}
            {testforsimilar(data)}
        </div>
    );
}

export default Results;
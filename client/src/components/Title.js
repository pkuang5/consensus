import React, { useState, useEffect } from "react";
import TextLoop from "react-text-loop";
import { useTrail, animated } from 'react-spring/hooks'
import 'rsuite/dist/styles/rsuite-default.css';
import {Button, ButtonToolbar} from 'rsuite';
import { Popover, Whisper } from 'rsuite';
import { Link } from "react-router-dom";

const items = ['Consensus']
const config = { mass: 5, tension: 2000, friction: 500 }

function Title(props) {
    
    const [toggle, set] = useState(true)
    const trail = useTrail(items.length, {
        config,
        opacity: toggle ? 1 : 0,
        x: toggle ? 0 : 20,
        height: toggle ? 80 : 0,
        from: { opacity: 0, x: 20, height: 0 },
    })

    const speaker1 = (
        <Popover>
            <p>Are you joining a group?</p>
        </Popover>
      );

    const speaker2 = (
        <Popover>
            <p>Are you going to create a group?</p>
        </Popover>
    );

    return (
        <div class="h-screen w-screen" style = {{ background : 'lightpink', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <div class="w-64 flex justify-end">
                <h1 class = "leading-none font-sans text-sm font-hairline text-white">
                    Welcome to
                </h1> 
            </div>
            {/* <h1 class = "leading-none font-sans text-6xl text-white uppercase">
                Consensus
            </h1> */}
            <div className="leading-none font-sans text-6xl text-white uppercase">
                <div>
                    {trail.map(({ x, height, ...rest }, index) => (
                    <animated.div
                        key={items[index]}
                        style={{ ...rest, transform: x.interpolate(x => `translate3d(0,${x}px,0)`) }}>
                        <animated.div style={{ height }}>{items[index]}</animated.div>
                    </animated.div>
                    ))}
                </div>
            </div>
            <div class="text-white font-sans">
                Decide where to {" "} 
                <TextLoop
                    springConfig={{ stiffness: 70, damping: 31 }}
                    adjustingSpeed={700}
                >
                    <span>travel</span>
                    <span>eat</span>
                    <span>hang out</span>
                </TextLoop>
            </div>
            <div class="h-4"/>
            <ButtonToolbar>
                <Whisper placement="bottom" trigger="hover" speaker={speaker1}>
                    <Link to="/Join">
                        <Button color="red" appearance="primary">Join Group</Button>
                    </Link>
                </Whisper>
                <Whisper placement="bottom" trigger="hover" speaker={speaker2}>
                    <Link to="/Create">
                        <Button color="red" appearance="ghost">Create Group</Button>
                    </Link>
                </Whisper>
            </ButtonToolbar>
        </div>
    );

}

export default Title;
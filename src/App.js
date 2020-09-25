import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { animated, useTransition } from 'react-spring/hooks'
import { render } from 'react-dom'
import Search from "./components/search";
//import Progress from './components/progress'
import Question from "./components/question";
import Poll from "./components/Poll";
import Loader from "./components/loader"
import Progress from 'react-progressbar'
import Title from "./components/Title"
//import Questionnaire from "./components/questionnaire";

import './styles/Spring.css'


// const pages = [
//   ({ style }) => <animated.div style={{ ...style, background: 'lightpink' }}>A</animated.div>,
//   ({ style }) => <animated.div style={{ ...style, background: 'lightblue' }}>B</animated.div>,
//   ({ style }) => <animated.div style={{ ...style, background: 'lightgreen' }}>C</animated.div>,
// ]

// export default function App() {
//   const [index, set] = useState(0)
//   const onClick = useCallback(() => set(state => (state + 1) % 3), [])
//   const transitions = useTransition(index, p => p, {
//     from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
//     enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
//     leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
//   })
//   return (
//     <div className="simple-trans-main">
//       {transitions.map(({ item, props, key }) => {
//         const Page = pages[item]
//         return <Page key={key} style={props} />
//       })}
//     </div>
//   )
// }

// render(<App />, document.getElementById('root'))

function App() {
//   const [index, set] = useState(0)
//   const onClick = useCallback(() => set(state => (state + 1) % 3), [])
//   const transitions = useTransition(index, p => p, {
//     from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
//     enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
//     leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
//   })
//   return (
//     <div className="simple-trans-main" onClick={onClick}>
//       {transitions.map(({ item, props, key }) => {
//         const Page = pages[item]
//         return <Page key={key} style={props} />
//       })}
//     </div>
//   )
return (
  <Title/>
);
//   return (
//     <Router>
//       <Switch>
//         <Route path="/" exact strict component={() =>
//           <Search />
//         }/>
//         <Route path="/:groupCode" exact strict component={({match}) =>
//           <div>
//             <Poll groupCode={match.params.groupCode} />
//           </div>
//         }/>
//       </Switch>
//     </Router>
//   );
}

export default App;

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Search from "./components/search";
//import Progress from './components/progress'
import Question from "./components/question";
import Poll from "./components/Poll";
import Loader from "./components/loader"
import Progress from 'react-progressbar'
import Container from './components/Container'
//import Questionnaire from "./components/questionnaire";
import Title from "./components/Title";
import Results from "./components/Results";

function App() {
  var groupcode = 308
  return (
    // <Router>
    //   <Switch>
    //     <Route path="/" exact strict component={() =>
    //       <Search />
    //     }/>
    //     <Route path="/:groupCode" exact strict component={({match}) =>
    //       <div>
    //         <Poll groupCode={match.params.groupCode} />
    //       </div>
    //     }/>
    //   </Switch>
    // </Router>
    // <Router>
    //   <Container>
    //     <Title/>
    //   </Container>
    // </Router>
    <Results groupCode = {groupcode} i={3} />
  );
}

export default App;

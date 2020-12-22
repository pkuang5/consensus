import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Search from "./components/search";
//import Progress from './components/progress'
import Question from "./components/question";
import Poll from "./components/Poll";
import Landing from "./components/landing";
//import Questionnaire from "./components/questionnaire";

function App() {
  return (
    <Router>
      <Switch>
        {/* <Route path="/" exact strict component={() => <Search />} /> */}
        <Route path="/" exact strict component={() => <Landing />} />
        <Route
          path="/:groupCode"
          exact
          strict
          component={({ match }) => (
            <div>
              <Poll groupCode={match.params.groupCode} />
            </div>
          )}
        />
      </Switch>
      {/* <Switch>
        <Route path="/" exact strict component={() => <Question />} />
      </Switch> */}
    </Router>
  );
}

export default App;

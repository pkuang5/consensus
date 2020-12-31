import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Search from "./components/search";
import Question from "./components/question";
import Poll from "./components/Poll";
import Loader from "./components/loader";
import Progress from "react-progressbar";
//import Questionnaire from "./components/questionnaire";
import Geolocation from "./components/Geolocation";

import SlideComponent from "./components/slide";
import JoinCode from "./components/joinCode";

function App() {
  return (
    <Router>
      {/* <Switch>
        <Route path="/" exact strict component={() => <Search />} />
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
      </Switch> */}
      
      <Switch>
        <Route path="/" exact strict component={() => <SlideComponent />} />
      </Switch>
    </Router>
  );
}

export default App;

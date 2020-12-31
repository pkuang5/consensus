import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Search from "./components/search";
import Question from "./components/question";
import Poll from "./components/Poll";
import Landing from "./components/landing";
//import Questionnaire from "./components/questionnaire";
import Geolocation from "./components/Geolocation";

import SlideComponent from "./components/slide";
import JoinCode from "./components/joinCode";

function App() {
  return (
    <Router>
<<<<<<< HEAD
      {/* <Switch>
        <Route path="/" exact strict component={() => <Search />} />
=======
      <Switch>
        <Route path="/search" exact strict component={() => <Search />} />
        <Route path="/" exact strict component={() => <Landing />} />
>>>>>>> 53b13628665061bba95188d8f9a17f8a5372ca90
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
<<<<<<< HEAD
      </Switch> */}
      
      <Switch>
        <Route path="/" exact strict component={() => <SlideComponent />} />
      </Switch>
=======
      </Switch>
      {/* <Switch>
        <Route path="/" exact strict component={() => <Question />} />
      </Switch> */}
>>>>>>> 53b13628665061bba95188d8f9a17f8a5372ca90
    </Router>
  );
}

export default App;

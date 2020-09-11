import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Search from "./components/search";
//import Progress from './components/progress'
import Question from "./components/question";
import Poll from "./components/Poll";
import Loader from "./components/loader"
import Progress from 'react-progressbar'
//import Questionnaire from "./components/questionnaire";


function App() {
  // const [showLoadingAnimation, setShowLoadingAnimation] = useState(false)
  // const [progressPercentage, setProgressPercentage] = useState(0)

  return (
    <Router>
      <Switch>
        {/* <Route path="/" exact strict component={() =>
          <Search 
            onSubmitSearch={(businesses) => setBusinesses(businesses)}
            businesses={businesses}
            groupCode={groupCode}
            onSetGroupCode={(code) => setGroupCode(code)}
            populateBusinesses={(businesses) => setBusinesses(businesses)}
            setShowLoadingAnimation={(bool) => setShowLoadingAnimation(bool)}
          />
        }/> */}
        <Route path="/:groupCode" exact strict component={({match}) =>
          <div>
            <Poll groupCode={match.params.groupCode} />
            {/* <Progress completed={progressPercentage} /> */}
          </div>
        }/>
        {/* {showLoadingAnimation ? <div class="h-screen w-screen flex justify-center items-center"><Loader loading={true} /></div> : null} */}
      </Switch>
    </Router>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import database from "./firebase";
import yelpREST from "./api/yelp";
import Poll from "./components/poll";
import Search from "./components/search";
import JoinCode from "./components/joinCode";
import CreateCode from "./components/createCode";
//import Progress from './components/progress'
import Question from "./components/question";
import Deck from "./components/Deck";
//import Questionnaire from "./components/questionnaire";

function App() {
  const [businesses, setBusinesses] = useState([]);
  const [groupCode, setGroupCode] = useState(0);
  const [cardData, setCardData] = useState([])

  useEffect(() => {
    if (businesses.length != 0) populateBusinesses(businesses)
  }, [businesses])

  async function populateBusinesses(idArray) {
    idArray.reduce(async (memo, id) => {
      await memo
      await yelpREST(`/businesses/${id}`).then(({ data }) => {
        var item = {
          id: data.id,
          name: data.name,
          pics: data.photos
        }
        setCardData(cardData => [...cardData, item])
      })
    }, undefined)
  }

  return (
    <React.Fragment>
      {/* <div>
        {!firstPress ? (
          <button
            onClick={next}
            class="w-40 h-10 bg-blue-600 text-white center"
          >
            Create a Group
          </button>
        ) : (
          <div>
            {currentQuestion == 0 ? (
              <Questionnaire
                message={
                  questionnaire[answers.length / questions.length].message
                }
                onNext={handleContinue}
              />
            ) : (
              <Question
                question={questions[currentQuestion].question}
                id={question.id}
                onContinue={handleContinue}
                onPrevious={handlePrevious}
              />
            )}
          </div>
        )}
      </div> */}
      {/* <div>
        <Question />
      </div>
      <div>
        <div>
        <CreateCode
        businesses={businesses}
        onCreateCode={(code) => setGroupCode(code)}
        />
        <JoinCode
        onJoinCode={(code) => setGroupCode(code)}
        populateBusinesses={(businesses) => setBusinesses(businesses)}
        />
      </div> */}
        {/* <Poll businesses={businesses} groupCode={groupCode} /> */}
        <Search onSubmitSearch={(businesses) => setBusinesses(businesses)} />
        {cardData.length == businesses.length && businesses.length != 0 ? <Deck data={cardData}/>:null}
      {/* </div> */}
    </React.Fragment>
  );
}

export default App;

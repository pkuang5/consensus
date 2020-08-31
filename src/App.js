import React, { useState, useEffect } from "react";
import database from "./firebase";
import yelpREST from "./api/yelp";
import Poll from "./components/poll";
import Search from "./components/search";
//import Progress from './components/progress'
import Question from "./components/question";
import Questionnaire from "./components/questionnaire";

function App() {
  const [businesses, setBusinesses] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);

  const questions = [
    { id: 1, question: "How many people are in your group?" },
    {
      id: 2,
      question:
        "Can we use your location to find the best spots to eat nearby?",
    },
    { id: 3, question: "This place should be within ____ miles from me" },
    { id: 4, question: "We want to eat in __(city)__" },
    { id: 5, question: "We want to spend($ $$ $$$)" },
    {
      id: 6,
      question:
        "We want to eat at a (Restaurant, Diner, Fast Food, Drinks & Desserts. ~Choose up to three~",
    },
    { id: 7, question: "(Optional) We want ___type of food___" },
    {
      id: 8,
      question: "How many options do you want to choose from (5 10 15 20)",
    },
    { id: 9, question: "We want our group's top (1 2 3)" },
  ];

  const questionnaire = [
    {
      id: 1,
      message:
        "Let's get started! Here are a couple questions to help us provide your group with best options!",
    },
    {
      id: 2,
      message:
        "Thank you for your responses! Now its time to reach a consensus!",
    },
  ];

  const question = questions[currentQuestion];
  var firstPress = false;

  const next = () => {
    if (currentQuestion + 1 <= questions.length) {
      // const answer = { questionID: question.id };
      // answers.push(answer);
      // console.log(question.id);
      // setCurrentQuestion(currentQuestion + 1);
      answers.length = 0;
    }
    firstPress = true;
    console.log(firstPress);
  };

  const handleContinue = () => {
    if (currentQuestion + 1 <= questions.length) {
      const answer = { questionID: question.id };
      console.log(question.id);
      answers.push(answer);
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    const answer = { questionID: question.id };
    answers.push(answer);

    if (currentQuestion - 1 > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <React.Fragment>
      <div>
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
      </div>
      {/* <div>
        {answers.length == 0 || answers.length == questions.length ? (
          <Questionnaire
            message={questionnaire[answers.length / questions.length].message}
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
      </div> */}
      <div>
        {businesses.length == 0 ? (
          <Search onSubmitSearch={(businesses) => setBusinesses(businesses)} />
        ) : (
          <Poll businesses={businesses} />
        )}
      </div>
    </React.Fragment>
  );
}

export default App;

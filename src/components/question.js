import React, { useState, useEffect, cloneElement } from "react";
import database from "../firebase";
// import {
//   isConditionalExpression,
//   isConstTypeReference,
//   isThisTypeNode,
// } from "typescript";

function Question(props) {
  const [index, setIndex] = useState(0);
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
    {
      id: 10,
      question:
        "Thank you for your responses! Now its time to reach a consensus!",
    },
  ];

  const statements = [
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

  var question = questions[index];

  const handleSubmit = () => {
    database
      .ref(`answers`)
      .set({
        q1: answers[0],
        q2: answers[1],
        q3: answers[2],
        q4: answers[3],
        q5: answers[4],
        q6: answers[5],
        q7: answers[6],
        q8: answers[7],
        q9: answers[8],
      })
      .then(() => {
        alert("Question 1 was answered💫");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleContinue = (input) => {
    if (
      index + 1 <= questions.length &&
      document.getElementById("input").value != ""
    ) {
      console.log("question #" + question.id);
      answers[index] = input;
      //setAnswers((answers) => [...answers, input]);
      setIndex(index + 1);
      console.log(index);
      console.log(answers);
      document.getElementById("input").value = "";
      console.log("Works");
      if (answers[index + 1] != null) {
        document.getElementById("input").value = answers[index + 1];
      }

      database
        .ref(`answers/q${question.id}`)
        .set(input)
        .then(() => {
          //console.log("Question" + question.id + "was sourced💫");
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  const handlePrevious = (input) => {
    if (index - 1 >= 0) {
      setIndex(index - 1);
      console.log("question #" + question.id);
      console.log(index);
      if (answers[index - 1] != null) {
        document.getElementById("input").value = answers[index - 1];
      }
    }
  };

  return (
    <div className="max-w-md mx-auto flex p-6 bg-gray-100 mt-10 rounded-lg shadow-xl">
      <div className="ml-6 pt-1">
        <br></br>
        {question.id != 10 && question.id != 0 ? (
          <div>
            <h1 className="text-2xl text-blue-700 leading-tight text-center">
              Question #{question.id}
            </h1>
            <p className="text-base text-gray-700 leading-normal text-center">
              {questions[index].question}
            </p>
            <input
              className="field"
              id="input"
              type="text"
              class="border rounded-md w-10 text-center"
              placeholder="##"
            ></input>
            <br></br>
            <button
              class="btn btn-primary w-20 h-10 bg-yellow-600 text-white m-2"
              onClick={() =>
                handlePrevious(document.getElementById("input").value)
              }
            >
              Back
            </button>
            <button
              class="btn btn-primary w-20 h-10 bg-yellow-600 text-white m-2"
              type="submit"
              onClick={() =>
                handleContinue(document.getElementById("input").value)
              }
              //onClick={() => handleSubmit()}
            >
              Submit
            </button>
          </div>
        ) : (
          <h1 className="text-2xl text-blue-700 leading-tight text-center">
            {statements[1].message}
          </h1>
        )}
      </div>
    </div>
  );
}

export default Question;

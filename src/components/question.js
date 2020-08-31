import React, { useState, useEffect } from "react";

function Question(props) {
  return (
    <div className="max-w-md mx-auto flex p-6 bg-gray-100 mt-10 rounded-lg shadow-xl">
      <div className="ml-6 pt-1">
        <h1 className="text-2xl text-blue-700 leading-tight">
          Question #{props.id}
        </h1>
        <p className="text-base text-gray-700 leading-normal text-center">
          {props.question}
        </p>
        <input
          class="border rounded-md w-10 text-center"
          placeholder="##"
          id="category"
        ></input>
        <br></br>
        <button
          class="btn btn-primary w-20 h-10 bg-yellow-600 text-white m-2"
          onClick={props.onPrevious}
        >
          Back
        </button>
        <button
          class="btn btn-primary w-20 h-10 bg-yellow-600 text-white m-2"
          onClick={props.onContinue}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default Question;

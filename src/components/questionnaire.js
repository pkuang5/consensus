import React from "react";

function Questionnaire(props) {
  return (
    <div className="mx-auto flex p-6 bg-gray-100 max-w-md mt-10 rounded-lg shadow-xl">
      <div className="ml-6 pt-1">
        <h1 className="text-2xl text-blue-700 leading-tight">
          {props.message}
        </h1>
        <p className="text-base text-gray-700 leading-normal">
          <button
            className="button"
            class="w-80 h-10 bg-blue-600 text-white m-2"
            onClick={props.onNext}
          >
            Click for Questionnaire
          </button>
        </p>
      </div>
    </div>
  );
}

export default Questionnaire;

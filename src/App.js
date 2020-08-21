import React from 'react';
import logo from './logo.svg';
import './App.css';
import database from './firebase'

function App() {

  const submitCode = () => {
    var code = document.getElementById("code").value
    var dummyValue = document.getElementById("dummyValue").value
    database.ref(`groups/${code}`).set(dummyValue)
  }

  return (
    <div>
      <div className="max-w-md mx-auto flex p-6 bg-gray-100 mt-10 rounded-lg shadow-xl">
        <div className="ml-6 pt-1">
          <h1 className="text-2xl text-blue-700 leading-tight">
            Consensus
          </h1>
          <p className="text-base text-gray-700 leading-normal">
            Vote for shit i guess lol
          </p>
        </div>
      </div>
      <div class="flex p-6 max-w-md mx-auto mt-10 bg-gray-100 rounded-lg shadow-xl">
        <div className="ml-6 pt-1">
          <h1 className="text-2xl text-blue-700 leading-tight">
            Enter code
          </h1>
          <input class="border rounded-md" id="code"></input>
          <input class="border rounded-md" id="code" placeholder="random text to send to the database" id="dummyValue"></input>
          <button class="w-24 h-10 bg-blue-600 text-white" onClick={() => submitCode()}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default App;

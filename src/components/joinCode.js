import React, { useState, useEffect } from 'react';
import database from '../firebase'


function JoinCode(props) {
  const submitCode = () => {
    var businesses = []
    var code = document.getElementById("code").value
    props.onJoinCode(code)
    database.ref(`groups/${code}`).once("value", (snapshot) => {
      snapshot.forEach(data => {
        businesses.push(data.key)
      })
    })
    props.populateBusinesses(businesses)
  }

  return (
    <div class="flex p-6 max-w-md mx-auto mt-10 bg-gray-100 rounded-lg shadow-xl">
      <div className="ml-6 pt-1">
        <h1 className="text-2xl text-blue-700 leading-tight">
          Enter code
          </h1>
        <input class="border rounded-md" id="code"></input>
        <button class="w-24 h-10 bg-blue-600 text-white" onClick={() => submitCode()}>Submit</button>
      </div>
    </div>
  );
}

export default JoinCode;
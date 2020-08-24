import React, { useState, useEffect } from 'react';
import './App.css';
import database from './firebase'
import yelpREST from './api/yelp'
const axios = require('axios')


function App() {

  const searchRestaurants = (location, term) => {
    console.log(location)
    yelpREST("/businesses/search", {
      params: {
        location: location,
        term: term,
        limit: 10,
      },
    }).then(({ data }) => {
      console.log(data)
      let { businesses } = data
      businesses.forEach((b) => {
        console.log("Name: ", b.name)
      })
    })
  }

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
          <input class="border rounded-md" placeholder="random text to send to the database" id="dummyValue"></input>
          <button class="w-24 h-10 bg-blue-600 text-white" onClick={() => submitCode()}>Submit</button>
        </div>
      </div>
      <div class="flex p-6 max-w-md mx-auto mt-10 bg-gray-100 rounded-lg shadow-xl">
        <div className="ml-6 pt-1">
          <h1 className="text-2xl text-blue-700 leading-tight">
            Business Search
          </h1>
          <input class="border rounded-md" placeholder="kyoto" id="location"></input>
          <input class="border rounded-md" placeholder="category" id="category"></input>
          <button class="w-24 h-10 bg-blue-600 text-white" onClick={() => searchRestaurants(document.getElementById("location").value, document.getElementById("category").value)}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default App;

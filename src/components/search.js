import React, { useState, useEffect } from "react";
import yelpREST from "../api/yelp";
import database from '../firebase'
import JoinCode from "./joinCode"
import { useHistory } from 'react-router-dom'

function Search(props) {

  let history = useHistory()

  async function populateBusinessesAndSetGroupCode(location, term) {
    await yelpREST("/businesses/search", {
      params: {
        location: location,
        term: term,
        limit: 10,
      },
    }).then(({ data }) => {      
      let { businesses } = data;
      var businessesArray = []
      var code = Math.floor(Math.random() * Math.floor(10000))
      
      businesses.reduce(async (memo, b) => {
        await memo
        await yelpREST(`/businesses/${b.id}`).then(({ data }) => {
          var item = {
            id: data.id,
            name: data.name,
            photos: data.photos
          }
          businessesArray.push(item)
          database.ref(`groups/${code}/${b.id}`).set(item)
          database.ref(`groups/${code}/${b.id}/vote`).set(0)
        })
      }, undefined);
      history.push(`/${code}`)
    })
  }

  return (
    <div>
      <div class="flex p-6 max-w-md mx-auto mt-10 bg-gray-100 rounded-lg shadow-xl">
        <div className="ml-6 pt-1">
          <h1 className="text-2xl text-blue-700 leading-tight">
            Business Search
          </h1>
          <input
            class="border rounded-md"
            placeholder="location"
            id="location"
          ></input>
          <input
            class="border rounded-md"
            placeholder="category"
            id="category"
          ></input>
          <button
            class="w-24 h-10 bg-blue-600 text-white"
            onClick={() =>
              populateBusinessesAndSetGroupCode(
                document.getElementById("location").value,
                document.getElementById("category").value
              )
            }
          >
            Submit
          </button>
          <JoinCode 
            onJoinCode={(code) => props.onSetGroupCode(code)}
            populateBusinesses={(businesses) => props.populateBusinesses(businesses)}
          />
        </div>
      </div>
    </div>
  );
}

export default Search;

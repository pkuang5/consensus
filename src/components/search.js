import React, { useState, useEffect } from "react";
import yelpREST from "../api/yelp";

function App(props) {
  const searchRestaurants = (location, term) => {
    yelpREST("/businesses/search", {
      params: {
        location: location,
        term: term,
        limit: 10,
      },
    }).then(({ data }) => {
      let { businesses } = data;
      businesses.forEach((b) => {
        props.onSubmitSearch((data) => [...data, b.id]);
      });
    });
  };

  return (
    <div>
      <div class="flex p-6 max-w-md mx-auto mt-10 bg-gray-100 rounded-lg shadow-xl">
        <div className="ml-6 pt-1">
          <h1 className="text-2xl text-blue-700 leading-tight">
            Business Search
          </h1>
          <input
            class="border rounded-md"
            placeholder="kyoto"
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
              searchRestaurants(
                document.getElementById("location").value,
                document.getElementById("category").value
              )
            }
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

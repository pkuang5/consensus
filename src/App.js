import React, { useState, useEffect } from 'react';
import database from './firebase'
import yelpREST from './api/yelp'
import Poll from './components/poll'
import Search from './components/search'

function App() {
  
  const [businesses,setBusinesses] = useState([])

  return (
    <div>
      {businesses.length==0?<Search onSubmitSearch={(businesses) => setBusinesses(businesses)} />:<Poll businesses={businesses} />}
    </div>
  );
}

export default App;

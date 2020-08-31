import React, { useState, useEffect } from 'react';
import Poll from './components/poll'
import Search from './components/search'
import JoinCode from './components/joinCode'
import CreateCode from './components/createCode'

function App() {
  
  const [businesses,setBusinesses] = useState([])
  const [groupCode, setGroupCode] = useState(0)

  return (
    <div>
      <div>
        <Search onSubmitSearch={(businesses) => setBusinesses(businesses)} />
        <CreateCode businesses={businesses} onCreateCode={(code) => setGroupCode(code)}/>
        <JoinCode onJoinCode={(code) => setGroupCode(code)} populateBusinesses={(businesses) => setBusinesses(businesses)}/>
      </div>
      <Poll businesses={businesses} groupCode={groupCode}/>
    </div>
  );
}

export default App;

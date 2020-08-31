import React, { useState, useEffect } from 'react';
import database from '../firebase'

function CreateCode(props){
    const submitCode = () => {
        var code = Math.floor(Math.random() * Math.floor(10000))
        props.businesses.forEach(id => {
            // database.ref(`groups/${code}`).push(id)
            database.ref(`groups/${code}/${id}`).set(0)
        })
        props.onCreateCode(code)
   }

   return (
       <div class="flex p-6 max-w-md mx-auto mt-10 bg-gray-100 rounded-lg shadow-xl">
         <button class="w-24 h-10 bg-blue-600 text-white" onClick={() => submitCode()}>Submit</button>
       </div>
   );
}

export default CreateCode;
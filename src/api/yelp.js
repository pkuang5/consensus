const axios = require('axios')

let yelpREST = axios.create({
    baseURL: `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/`,
    headers: {
        Authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`,
        "Content-type": "application/json",
    },
})

export default yelpREST
const axios = require('axios')

let yelpREST = axios.create({
    baseURL: 'https://us-central1-pk-consensus.cloudfunctions.net/yelp/yelp',
})

export default yelpREST
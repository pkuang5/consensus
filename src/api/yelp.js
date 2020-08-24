const axios = require('axios')

let yelpREST = axios.create({
    baseURL: `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/`,
    headers: {
        Authorization: `Bearer nL08itDQ0UA0STOzhtKROkt_RWkdKfqy7mXYDYAbf7_0ZGRxDt08vY90sJ507cNXG3E6KevIW8I_CWrlthX2Wfs9FrQGKWy2YtG0RuxJc7t31-URMsbMZgYVTp1BX3Yx`,
        "Content-type": "application/json",
    },
})

export default yelpREST
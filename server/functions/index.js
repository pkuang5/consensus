const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const config = require('./config');

const app = express(config.firebaseConfig);

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// app.listen(config.port, () => console.log(`App is listening on url http://localhost:${config.port}`));

const yelp = axios.create({
  baseURL: 'https://api.yelp.com/v3/',
  headers: {
    'Authorization': `Bearer ${config.yelpApiKey}`,
    'Content-type': 'application/json',
  },
});

app.get('/test', async (req, res) => {
  res.status(200).send('api working!');
});

app.get('/yelp', async (req, res) => {
  console.log(req.query);
  const endpoint = req.query.endpoint;
  delete req.query.endpoint;
  await yelp(endpoint, {
    params: req.query,
  }).then( ({data}) => {
    // console.log(data);
    res.status(200).send(data);
  }).catch( (error) =>
    console.log(error)
  );
});

exports.yelp = functions.https.onRequest(app);

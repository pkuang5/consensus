import firebase from 'firebase'
import config from './config'

const db = firebase.initializeApp(config.firebaseConfig)

module.exports = db
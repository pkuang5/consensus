import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import config from './config.js'
const app = express()

app.use(express.json())
app.use(cors())
app.use(bodyParser.json())

console.log(config)

app.listen(config.port, () => console.log(`App is listening on url http://localhost: + ${config.port}`))
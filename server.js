const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const router = require('./router')
const uri = "mongodb+srv://passfort:Gl7GMEFmYxBCnNkv@cluster0.hj5lqs6.mongodb.net/wiki?retryWrites=true&w=majority" // MongoDB URI, database is specific to this project

dotenv.config()
const port = process.env.PORT || 3000
const app = express()

// MIDDLEWARE
app.use(helmet())
app.use(cors())
app.use(morgan('combined'))
app.use(bodyParser.json())
app.disable("x-powered-by") // keeps technologies used private
app.use(router)

// START
let server
let db
try {
    // SERVER START
    server = app.listen(port)
    // DB START
    mongoose.connect(uri)
}
catch (err) {
    console.log(err)
}
finally {
    console.log(`API listening on http://localhost:%${port}`)
    console.log(`Connected to DB`)
    
}
import express from 'express';
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import router from './router'
const uri = "" // MongoDB URI

dotenv.config()
const port = process.env.PORT || 3000
const app = express()

// MIDDLEWARE
app.use(helmet())
app.use(cors())
app.use(morgan('combined'))
app.use(router)
app.use(bodyParser.json()) // parses and extracts a request's JSON body to req.body
app.disable("x-powered-by") // keeps technologies used private

// START
let server
let db
try {
    // SERVER START
    server = await app.listen(PORT)
    // DB START
    db = await mongoose.connection
}
catch (err) {
    console.log(err)
}
finally {
    console.log(`API listening on http://localhost:%${port}`)
    console.log(`Connected to DB`)
    
}
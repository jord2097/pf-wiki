const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    title: String,
    content: String
})
const mongoose = require('mongoose')

const documentSchema = mongoose.Schema({
    title: String,
    content: String,
    timestamp: { type: Date, default: () => new Date() }
})

module.exports.Document = mongoose.model('documents', documentSchema, 'documents')
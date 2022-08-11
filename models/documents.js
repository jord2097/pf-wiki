const mongoose = require('mongoose')

const documentSchema = mongoose.Schema({
    title: { type: String, required: true, maxLength: 50},
    content: String,
    timestamp: { type: Date, default: () => new Date() }
})

module.exports.Document = mongoose.model('documents', documentSchema, 'documents')
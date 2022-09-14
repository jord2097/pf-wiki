const mongoose = require('mongoose')

const documentSchema = mongoose.Schema({
    title: { type: String, required: true, maxLength: 50},
    revisions: [
        mongoose.Schema.Types.ObjectId        
    ]
        
})

module.exports.Document = mongoose.model('documents', documentSchema, 'documents')
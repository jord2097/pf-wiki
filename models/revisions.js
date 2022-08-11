const mongoose = require('mongoose')


const revisionSchema = mongoose.Schema({
    title: { type: String, required: true, maxLength: 50},
    revisions: [{
        docID: mongoose.Schema.Types.ObjectId,         
        timestamp: Date
    }]
        
})

module.exports.Revision = mongoose.model('revisions', revisionSchema, 'revisions')
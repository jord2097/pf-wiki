const mongoose = require('mongoose')


const revisionSchema = mongoose.Schema({
    title: String,
    revisions: [{
        docID: mongoose.Schema.Types.ObjectId,         
        timestamp: Date
    }]
        
})

module.exports.Revision = mongoose.model('revisions', revisionSchema, 'revisions')
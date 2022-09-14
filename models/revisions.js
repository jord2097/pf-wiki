const mongoose = require('mongoose')

const revisionSchema = mongoose.Schema({    
    content: String,
    timestamp: { type: Date, default: () => new Date() }
})

module.exports.Revision = mongoose.model('revisions', revisionSchema, 'revisions')
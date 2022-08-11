const express = require('express')
const documents = require('./controller')
const router = express.Router()

router.get('/documents', documents.titles) // get all documents (long list of all revisions)
router.get('/documents/:title', documents.revisions) // get all revisions of a document
router.get('/documents/:title/:timestamp', documents.byTimeStamp) // get a document as it was at a specific time
router.post('/documents/:title', documents.create) // create/update document
router.delete('/delete/documents/:confirm', documents.deleteAll) // delete all - dev only


module.exports = router
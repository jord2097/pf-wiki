const express = require('express')
const documents = require('./controller')
const router = express.Router()

router.get('/documents', documents.index) // get all posts
router.post('/documents/:title', documents.create)


module.exports = router
const express = require('express')
const documents = require('./controller')
const router = express.Router()

router.get('/posts', (req, res, next) => {}) // get all posts
router.get('/posts/:id') // get single post

module.exports = router
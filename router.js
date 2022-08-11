import express from 'express';
const router = express.Router()

router.get('/posts', (req, res, next) => {}) // get all posts
router.get('/posts/:id') // get single post



const express = require('express')
const router = express.Router()
const controllers = require('../controllers/posts')

router.get('/',controllers.getPosts)
router.post('/createPost', controllers.createPost)
router.delete('/deletePost', controllers.deletePost)


module.exports = router
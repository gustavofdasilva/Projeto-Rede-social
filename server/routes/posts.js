const express = require('express')
const router = express.Router()
const controllers = require('../controllers/posts')
const bodyParser = require('body-parser')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: true}))

router.get('/',controllers.getPosts)
router.post('/getUserPosts',controllers.getUserPosts)
router.post('/createPost', controllers.createPost)
router.delete('/deletePost', controllers.deletePost)


module.exports = router
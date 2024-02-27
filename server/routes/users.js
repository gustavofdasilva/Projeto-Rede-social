const express = require('express')
const router = express.Router()
const database = require('../dbconnection')
const controllers = require('../controllers/users')
const bodyParser = require('body-parser')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: true}))

router.get('/', controllers.getAllUsers)
router.post('/profile', controllers.getUser) //! login é feito com o método POST
router.post('/register', controllers.createUser)
router.delete('/delete', controllers.deleteUser)

// router.put('/update',(req,res)=>{

// })

module.exports = router
const database = require('../dbconnection')

const getPosts = (req,res) => {
    res.send("Getting all posts...")
}

const createPost = (req,res) => {
    res.send('Create post!')
}

const deletePost = (req,res) => {
    res.send('Delete post!')
}

module.exports = {
    createPost,
    deletePost,
    getPosts
}
const express = require('express')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/socialMedia')
const userSchema = mongoose.Schema({
    email: String,
    username: String,
    password: String
})
const userCollection = mongoose.model('users',userSchema)

const postSchema = mongoose.Schema({
    userId: String,
    username: String,
    desc: String,
    date: Date,
    
})

const postCollection = mongoose.model('posts',postSchema)

module.exports = {
    userCollection,
    postCollection
}
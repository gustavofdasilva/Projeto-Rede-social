const express = require('express')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/socialMedia')
const userSchema = mongoose.Schema({
    email: String,
    img: String,
    username: String,
    password: String
})
const userCollection = mongoose.model('users',userSchema)

const postSchema = mongoose.Schema({
    userId: String,
    img: String,
    desc: String,
    date: Date,
    email: String,
    password: String,
})

const postCollection = mongoose.model('posts',postSchema)

module.exports = {
    userCollection,
    postCollection
}
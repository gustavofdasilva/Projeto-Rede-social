const express = require('express')
const app = express()
const database = require('../dbconnection')


const getAllUsers = (req,res) =>{
    database.userCollection.find({})
    .then(user=>{
        res.status(200)
            .json(user)    
    })
    .catch(error=>{
        res.status(401)
            .json(error)
    })
}

const getUser = (req,res) =>{
    const {email, password} = req.body;

    database.userCollection.findOne({email: email})
        .then(user=>{
            if(user.password === password) {
                console.log(user.password)
                res.status(200)
                    .json(user)
            } else {
                res.status(401)
                    .json({sucess: false, message: 'user found, but the password is wrong'})
            }
            
        })
        .catch(error=>{
            res.status(401)
                .json(error)
        })
}

const createUser = (req,res) =>{
    const {email,password} = req.body;
    console.log(req.body)
    console.log(req.files)

    const createUser = async () => {
        await database.userCollection.create({
            email,
            password
        })
    }

    createUser()
        .then(()=>{
            res.status(201)
                .set('Content-Type', 'application/json')
                .json({sucess: true, message: `User of email ${email} was created`})
        })
        .catch(()=>{
            res.status(400)
                .json({sucess: false, message: `User not created`})
        })
}

const deleteUser = (req,res) =>{
    //Delete all the posts created by the user
    const {id} = req.params
    const deleteUser = async () => {
        await database.userCollection.deleteOne({_id: id})
    }

    deleteUser()
        .then(()=>{
            res.status(200)
                .json({sucess:true, message: `User of id ${id} was deleted`})
        })
        .catch(()=>{
            res.status(404)
                .json({sucess: false, message: 'User not found'})
        })
}

module.exports = {
    createUser,
    deleteUser,
    getAllUsers,
    getUser
}
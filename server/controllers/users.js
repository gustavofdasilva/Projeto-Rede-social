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

const createUser = async (req,res) =>{
    const {email,img,username,password} = req.body;

    const createUser = async () => {
        await database.userCollection.create({
            img,
            email,
            username,
            password
        })

        return await database.userCollection.findOne({
            username
        })
    }

    createUser()
        .then((response)=>{
            console.log(response)
            res.status(201)
                .set('Content-Type', 'application/json')
                .json(response)
        })
        .catch(()=>{
            res.status(400)
                .json({sucess: false, message: `User not created`})
        })
}

const updateUser = (req,res) =>{
    const {_id,username,img} = req.body;
    res.setHeader({
        "Acess-Control-Allow-Methods":"PUT",
    })
    req.setHeader({
        "Acess-Control-Allow-Methods":"PUT",
    })
    const update = async () => {
        await database.userCollection.updateOne(
            {_id},
            {username, img}
        )
    }

    update()
        .then(()=>{
            res.status(204)
                .json({sucess:true, message:'user was sucessfully updated'})
        })
        .catch((err)=>{
            res.status(400)
                .json({sucess:false, message:'unable to update user'})
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
    updateUser,
    getAllUsers,
    getUser
}
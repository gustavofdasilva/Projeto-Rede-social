const database = require('../dbconnection')

const getPosts = (req,res) => {
    database.postCollection.find({})
        .then(posts => {
            res.json(posts)
        })
        .catch(err=>{
            res.json(err)
        })
}

const getUserPosts = (req,res) =>{
    const {userId} = req.body
    database.postCollection.find({userId})
        .then(posts=>{
            res.status(200)
                .json(posts)
        })
        .catch(err=>{
            res.status(400)
                .json({sucess: false, message: 'Unable to get user posts'}, err)
        })
}

const createPost = (req,res) => {
    const {userId, desc, date, img, email, password} = req.body
    const createPostDb = async () =>{
        await database.postCollection.create({userId,img,desc,date,email,password})
    }

    createPostDb()
        .then(response=>{
            res.status(200)
                .json({sucess:true, message: 'post created'})
        })
        .catch(err=>{
            res.status(400)
                .json({sucess:false, message:'unable to create', err: err})
        })
    
}

const deletePost = (req,res) => {
    const {id} = req.body
    console.log(id)
    const deletePost = async () => {
        await database.postCollection.deleteOne({_id: id})
    }

    deletePost()
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
    createPost,
    deletePost,
    getPosts,
    getUserPosts
}
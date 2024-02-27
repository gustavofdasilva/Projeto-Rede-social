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
    console.log(userId)
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
    const {userId, desc, date} = req.body
    const createPostDb = async () =>{
        await database.postCollection.create({userId,desc,date})
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
    res.send('Delete post!')
}

module.exports = {
    createPost,
    deletePost,
    getPosts,
    getUserPosts
}
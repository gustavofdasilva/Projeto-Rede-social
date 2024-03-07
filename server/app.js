//! Incluir imagem de perfil e imagem do post
const express = require('express')
const app = express()
const usersRoute = require('./routes/users')
const postRoute = require('./routes/posts')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept",
    );
    next();
});

app.use('/users',usersRoute)
app.use('/posts',postRoute)

app.listen(5000,()=>{
    console.log('Server listening in 5000')
})
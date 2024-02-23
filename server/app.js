const express = require('express')
const app = express()

app.get('/',(req,res)=>{
    res.send('Server up!')
})

app.listen(5000,()=>{
    console.log('Server listening in 5000')
})
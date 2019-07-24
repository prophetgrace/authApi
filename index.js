const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/api/login', (req,res) =>{

    //creating a mock user
    const user = {
        id:1,
        username: 'kitaka',
        email:'kitakagrace@gmail.com'
    }
    jwt.sign({user}, 'secretkey',(error,token)=>{
        res.json({
            token
        })
    })
   
 })

 function verifyToken(req,res,next){
     const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader!== 'undefined'){
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next
     }else{
         res.json({
             message:'Access denied'
         })
     }
 }
app.post('/api/posts',verifyToken, (req,res) =>{
    jwt.verify(req.token, 'secretkey',(error,authData) =>{
        if(error){
            res.sendStatus(403)
        }else{
            res.json({
                message: 'Post created',
                authData
            })
        }
    })
})

app.listen(3000, (req,res) =>{
    console.log("Auth running at port 3000")
})
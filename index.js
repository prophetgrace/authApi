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

 const checkToken = (req, res, next) => {
    const header = req.headers['authorization'];

    if(typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];

        req.token = token;
        next();
    } else {
        //If header is undefined return Forbidden (403)
        res.sendStatus(403)
    }
}

app.post('/api/posts',checkToken, (req,res) =>{
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
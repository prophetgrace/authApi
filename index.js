const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();
const users = require('./db/userDb');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/api/login', (req,res) =>{

    //creating a mock user
    const user = {
        id:1,
        email:'kitakagrace@gmail.com',
        password:"12345"
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

//Protected Route
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











//user can successfully signup
app.post('/api/v1/signup', (req,res)=>{
    const userSchema = {
        email: req.body.email,
        password:req.body.password,
        first_name:req.body.first_name,
        last_name:req.body.last_name
       
    }
    jwt.sign({userSchema},'secretkey',(error,token)=>{
        
        res.json({
            status: "success",
            data:{
            token:token,
            email: userSchema.email,
            first_name: userSchema.first_name,
            last_name: userSchema.last_name
            }
            
           
       })
       
    })
    
    

})


app.listen(3000, (req,res) =>{
    console.log("Auth running at port 3000")
})
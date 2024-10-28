const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const port = 3019

const app = express()
app.use(express.static(__dirname))
app.use(express.urlencoded({extended:true}))
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/moa')
const db = mongoose.connection
db.once('open',()=>{
    console.log("Mongodb connection succesfull")
})

const userSchema = new mongoose.Schema({
    loginEmail:String,
    loginPassword:String,
    signupFullName:String,
    signupEmail:String,
    signupPassword:String,
    signupAge:String,
    signupConfirmPassword:String
})

const Users = mongoose.model("datas",userSchema)

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'login_signup.html'))
})

app.post('/post',async (req,res)=>{
    const {loginEmail,loginPassword,signupFullName,signupEmail,signupPassword,signupAge,signupConfirmPassword} = req.body
    const user = new Users({
        loginEmail,
        loginPassword,
        signupFullName,
        signupEmail,
        signupPassword,
        signupAge,
        signupConfirmPassword
    })
    await user.save()
    console.log(user)
    // res.send("Successfull Submit");
    res.sendFile(path.join(__dirname,'dashboard.html'))
})

app.listen(port,()=>{
    console.log("Server started")
})
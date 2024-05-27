const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const collection = require("./mongodb");
// const bcrypt = require("bcrypt");

const templatepath = path.join(__dirname,'../templates');
const publicPath = path.join(__dirname, '../public')

app.use(express.json())
app.set("view engine","hbs")
app.set("views",templatepath)
app.use(express.urlencoded({extended:true}))
app.use(express.static(publicPath))

app.get("/",(req,res)=>{
    res.render("login")
})

app.get("/signup",(req,res)=>{
    res.render("signup")
})

app.post("/signup",async (req,res)=>{
    const data = {
        name: req.body.name,
        password: req.body.password
    }
    console.log(data)
    const checking = await collection.findOne({name: req.body.name})
    try{
        if(checking && checking.name === req.body.name){
            res.send("user name already exists")
        } 
        else{
            await collection.insertMany([data])
            res.render("home")
        }

    }catch(error){
        console.error("Error during sign up",error)
        res.send("Wrong inputs")
    }
})

app.post("/login",async (req,res)=>{
    try{
        const data = {
            name: req.body.name,
            password: req.body.password
        }
        console.log(data)
      const check = await collection.findOne({name: req.body.name})
        if(check && check.password === req.body.password){
            res.render("home")
        }
        else{
            res.send("wrong password")
    }
    }catch{
        res.send("wrong details")
    }
})

app.listen(3000,()=>{
    console.log("port connected");
})
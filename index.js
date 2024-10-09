const express=require("express");
const mongoose=require("mongoose");
const app=express();
const user=require("./models/user");

app.set("view engine",'ejs');
app.set("views",'views');


mongoose.connect('mongodb://127.0.0.1:27017/auth')
.then(()=>{
    console.log("mongoose CONNECTION ESTABLISHED")
})
.catch(err=>{
    console.log("ERROR")
})

app.use(express.urlencoded({extended:true}));
app.get("/register",(req,res)=>{
    res.render("register")
})
app.get("/secret",(req,res)=>{
    res.send("This is a secret")
})
app.post("/register",(req,res)=>{
        res.send(req.body);
})
app.listen(3000,()=>{
    console.log("App is working");
    
})
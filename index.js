const express=require("express");
const mongoose=require("mongoose");
const app=express();
const User=require("./models/user");
const Bcrypt=require("Bcrypt");
const session=require("express-session");
app.set("view engine",'ejs');
app.set("views",'views');

app.use(session({
    secret:"nosecret",
    resave: true,
    saveUninitialized: true
}));
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
    if(!req.session.userId){
        return res.redirect("/login");
    }
    res.render("secret");
})
app.get("/login",(req,res)=>{
    res.render("login")
})
app.post("/login",async(req,res)=>{
    const {username,password}=req.body;
    const valid=await User.findAndValidate(username,password);
    if(valid){
        req.session.userId=valid._id;
        return res.redirect("secret");
    }else{

        res.redirect("login");
    }
    
})
app.post("/register",async(req,res)=>{
    const {username,password}=req.body;
    const hash =await Bcrypt.hash(password,12);
    const user=new User({
        username,
        password:hash
    });
    await user.save();
    req.session.userId=user._id;
        res.render("secret");
})
app.get('/',(req,res)=>{
    res.send("HOME");
})
app.post("/logout",(req,res)=>{
    req.session.destroy();
    res.redirect("/login");
})
app.listen(3000,()=>{
    console.log("App is working");
    
})
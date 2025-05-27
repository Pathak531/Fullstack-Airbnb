const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts =  require("./routes/posts.js");
//session aur ye ek middleware hai
const session = require("express-session");
const flash = require("connect-flash");
const { name } = require("ejs");
const path = require("path");




const sesionOption = {
 secret : "mysupersecretcode",
 resave : false , 
 saveUninitialized:true,
};
app.use(session(sesionOption));
app.use(flash());
//storing info express


app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
})


app.get("/register",(req,res)=>{
let {name ="anonymous"} = req.query;
req.session.name = name;

if(name == "anonymous"){
    req.flash("error","some error occured!");
}
else{
    req.flash("success","user register sucessfuly!");
}
res.redirect("/hello");

});

app.get("/hello",(req,res)=>{
  
    res.render("page.ejs",{name: req.session.name});

})












//sesion req count check cline and server
// app.get("/reqcount",(req,res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }
//     else{
//         req.session.count = 1;
//     }
   
// res.send(`you send req ${req.session.count} times.`);
// })

// app.use(session({secret :"mysupersecretstring"}));
// app.get("/test", (req,res)=>{
//     res.send("test is successfull");
// })













// const cookieParser = require("cookie-parser");

// app.use(cookieParser("secretcode"));

// app.get("/getsignedcookie",(req,res)=>{
//     res.cookie("made-in","India",{signed:true});
//     res.send("singend  cookie send !");
// })

// app.get("/verify",(req,res)=>{
//     console.log(req.signedCookies);
// })

// app.get("/getcookies",(req,res)=>{
//     res.cookie("greet","namste");
//     res.cookie("madein","india");
//     res.send("send some cookies");
// })

// app.get("/greet",(req,res)=>{
//     let {name = "anonomys"} = req.cookies;
//     res.send(`Hii ${name}`);

// })



// app.get("/" , (req,res)=>{
//     console.dir(req.cookies);
//     res.send("Hii , i am root");

// })

// app.use("/users",users);

// app.use("/posts",posts);

app.listen(3000,()=>{
    console.log("sever is listening 3000");
    
})


if(process.env.NODE_ENV != "production"){
require('dotenv').config();    
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/wonderlust"
// const Listing = require("./models/listing.js");
app.use(express.urlencoded({extended:true}));
const path = require("path");
const methodOverride = require("method-override");
const { log } = require("console");
app.use(methodOverride("_method"));
const ejsMate = require("ejs-mate");

app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"public")));
//micopiko
// const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
// const {listingSchema ,reviewSchema} = require("./Schema.js");
// const Review = require("./models/review.js");
app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));
  





const listingsRouter = require("./route/listing.js");
const reviewsRouter = require("./route/reviwe.js");
const userRouter = require("./route/user.js");
const { reverse } = require("dns");
const data = require("./init/data.js");
main().then(()=>{
    console.log("connected to DB");
 }).catch((err)=>{
    console.log(err);
    
 });

async function main() {
    await mongoose.connect(MONGO_URL);
  
    
  }


const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");  
const User = require("./models/user.js");
const session = require("express-session");
const sessionOption = {
    secret : "mysupersecretcode",
    resave : false , 
    saveUninitialized : true,
    cookie : {
        expires : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // ✅ Correct
        maxAge :  7 * 24 * 60 * 60 * 1000,
        httpOnly : true
    }
}
app.get("/",(req,res)=>{                        
    res.send("i am root");
});
app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
     res.locals.success = req.flash("success");
     res.locals.error = req.flash("error");
     res.locals.currUser = req.user;
     next();
})

// app.get("/demouser",async(req,res)=>{
//     let fakeUser = new User({
//         email:"studen@gmail.com",
//         username : "delta-student",
//     });

//     const registerdUser =  await User.register(fakeUser,"helloworld");
//     res.send(registerdUser);
    
// });


app.use("/listings",listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/",userRouter);





app.get("/test", (req, res) => {
    req.session.user = "TestUser";
    res.send("Session is set!");
});




 

// //test listing
// app.get("/testlisting" , async (req,res)=>{
//    let samplelisting = new Listing({
//     title :"My New Vila",
//     description :"on the beach",
//     price:1200,
//     location : "Calangute, Goa",
//     country :"India"
//    })
//    await samplelisting.save();
//    console.log("sample was a save");
//    res.send("sucessful")
   
// })

app.all("*" ,(req,res,next)=>{
    next( new ExpressError(404,"page is not found"));

})

app.use((err,req,res,next)=>{
    let{statuscode = 500,message ="something went wrong"} = err;
    res.status(statuscode).render("Error.ejs" ,{err});
    // res.status(statuscode).send(message);

})
app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});
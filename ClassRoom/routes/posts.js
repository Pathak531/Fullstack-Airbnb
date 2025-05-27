const express = require("express");
const router = express.Router();

//post
router.get("/",(req,res)=>{
    res.send("get FOR POST")
});

//SHOW
router.get("/:id",(req,res)=>{
    res.send(" FOR SHOW POST")
});

//post
router.post("/",(req,res)=>{
    res.send("POST FOR POST")
});

//delete 
router.delete("/:id",(req,res)=>{
    res.send("DELETE ID FOR POST")
})

module.exports= router;
const express = require("express");
const router = express.Router();

//index users
router.get("/",(req,res)=>{
    res.send("GET FOR USERS")
});

//SHOW- users
router.get("/:id",(req,res)=>{
    res.send("GET FOR SHOW USERS ID")
});

//post- users
router.post("/",(req,res)=>{
    res.send("POST FOR USERS")
});

//delete users
router.delete("/:id",(req,res)=>{
    res.send("DELETE ID FOR USERS")
})

module.exports = router;
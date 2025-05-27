const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport =require("passport");
const { saveRdirectUrl } = require("../middlleware.js");
const userController = require("../controller/user.js");

router.route("/signup")
.get(userController.renderSignup)
.post( wrapAsync(userController.signupPost));

router.get("/logout",userController.logout);

router.route("/login")
.get(userController.renderLogin)
.post(saveRdirectUrl,passport.authenticate("local",
  { failureRedirect: '/login',
  failureFlash :true, }),userController.login);


module.exports =router;

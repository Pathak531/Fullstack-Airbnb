const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
// const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner,validateListing } = require("../middlleware.js");
// const { path } = require("express-cookie/lib/application.js");
const listingController = require("../controller/listing.js");
const multer  = require('multer');
const {storage} =require("../cloudConfig.js");
const upload = multer({ storage });

router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn, upload.single("listings[image]"),validateListing, wrapAsync( listingController.createListing)); //index route And // create  route

//new route
router.get("/new", isLoggedIn , listingController.renderNewForm);

router.route("/:id")
.get(wrapAsync(listingController.showListings))
.put(isLoggedIn,isOwner, upload.single("listings[image]"),validateListing,wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner,wrapAsync( listingController.destroyListing));//show route,updat and delete route

//edit route
router.get("/:id/edit",isLoggedIn ,isOwner,wrapAsync(listingController.renderEditFrom));


module.exports =router;
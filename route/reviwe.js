const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {validateReview, isLoggedIn, isReviewAuthor} =require("../middlleware.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const reviewController = require("../controller/review.js")

//Review
//post review route
router.post("/",isLoggedIn,validateReview, wrapAsync(reviewController.createReview));
   
//delete review  route 
 router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.destroyReview));
   
   module.exports = router;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const { type } = require("express-cookie/lib/response.js");
const { number, required } = require("joi");
const listingSchema = new Schema({
    
        title: { 
            type: String,
            required: true,
        },
        description:{
            type : String,
            trim : true

        } ,
        image: { 
            url : String, 
            filename: String,
            
        },  // <-- Now storing an object
        price: Number,
        location: String,
        country: String,
        reviews :  [{
            type : Schema.Types.ObjectId,
            ref : "Review"


    }] ,
    owner : {
        type : Schema.Types.ObjectId,
        ref :"User"
    },

       geometry :{
       type :String,
       enum :['Point'],
       required :true


       },

    coordinates :{
     type : [Number],
     required : true

    }


    });
    
    listingSchema.post("findOneAndDelete", async (listing)=>{
     if(listing){
        await Review.deleteMany({_id :{$in : listing.reviews}});
     }

    })

const Listing =mongoose.model("Listing",listingSchema);
module.exports = Listing;

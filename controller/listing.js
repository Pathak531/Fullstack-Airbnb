const Listing =require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req,res)=>{
    const allListing = await Listing.find({})

    res.render("listings/index.ejs", { allListing });

};


module.exports.renderNewForm = (req,res)=>{
    res.render("listings/new.ejs");
};

module.exports.showListings = async (req,res)=>{
    let {id} = req.params;
   const listing =  await Listing.findById(id).populate({path:"reviews",populate :{path:"author"}}).populate("owner");
   if(! listing){
    req.flash("error","Listing you requested for does not exist!");
    res.redirect("/listings")
   }
   console.log(listing);
   
   res.render("listings/show.ejs",{listing})
    

};

module.exports.createListing = async (req,res,next)=>{
       
  let response =  await geocodingClient.forwardGeocode({
  query: req.body.listings.location,
  limit: 1
})
  .send()

        //    let {title,description,image,price,location,country} =req.body;
    //    if(!newlisting.description){
    //     throw new ExpressError(400,"Description is missing!");
    //    }
    //    console.log("recrive data ",req.body.listings);
    let url = req.file.path;
    let filename = req.file.filename;
   
    const newlisting =  new Listing(req.body.listings);
    newlisting.owner = req.user._id;
    console.log(req.body)
    newlisting.image = {url,filename};

    newlisting.geometry =  response.body.features[0].geometry; 

    let savedListing =    await newlisting.save();
       console.log(savedListing);
       
       req.flash("success","New Listing Created!");
        res.redirect("/listings");
      
        

};

module.exports.renderEditFrom = async (req,res)=>{
 let {id} = req.params;
   const listing =  await Listing.findById(id);
   if(! listing){
    req.flash("error","Listing you requested for does not exist!");
    res.redirect("/listings")
   }
   let originalImageUrl = listing.image.url;
   originalImageUrl = originalImageUrl.replace("/upload","/upload/w_250");
   res.render("listings/edit.ejs" ,{listing,originalImageUrl});

};


module.exports.updateListing = async (req,res)=>{
    // if(!req.body.listings){
    //     throw new ExpressError(400,"Send valid data for listings");
    //   }
    let {id} = req.params;
  let listing = await  Listing.findByIdAndUpdate(id ,{...req.body.listings});
  if( typeof req.file !== "undefined"){
  let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url,filename};
    await listing.save();
  }
  req.flash("success","Listing Updated");
  res.redirect(`/listings/${id}`);

};


module.exports.destroyListing = async (req,res)=>{
    let {id} =req.params;
  let deleteListing =   await Listing.findByIdAndDelete(id);
  req.flash("success","Listing Deleted!");
  console.log(deleteListing);
  res.redirect("/listings");
  
};


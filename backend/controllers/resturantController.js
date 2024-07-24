const asyncHandler = require("express-async-handler");

const Resturant = require("../models/resturantModels");
const Seller = require("../models/sellerModel");
const imageHelper = require("../helper functions/imageUpload");

//@desc get resturant
//@route GET /api/resturant
//@access public

const allResturant = asyncHandler(async (req,res) => {
let resturant = await Resturant.find();
res.status(200).json(resturant);
});

//@desc get resturant
//@route GET /api/resturant
//@access public

const getResturantById = asyncHandler(async (req,res) => {
  console.log("here");
  const { _id } = req.params;
 
  if(!_id)
  {
    res.status(400);
    throw new Error("please enter id");
  }

  console.log("id",_id);
  let resturant = await Resturant.findOne({_id});
  console.log("resturant",resturant);
  res.status(200).json(resturant);
  });
  

//@desc get resturant
//@route GET /api/resturant/:ocation
//@access public

const getResturantByLocation = asyncHandler(async (req,res) => {

  let {location} = req.params;
  let resturants = await Resturant.find({location});

  res.status(200).json(resturants);
  });





//@desc Create new resturant
//@route POST /api/resturant
//@access public

const newResturant = asyncHandler(async (req, res) => {
  let { name, location, sellerId, address, timing, menuId, phone, image, offer, tags ,minPrice, maxPrice } =
    req.body;
   let id = req.user.id;

   console.log("new resturant request",req.user.id);
   if(!id)
   {
    res.status(400);
    throw new Error("Error in creating new resturant");
   }
   console.log("req body",req.body);
  if (!name || !location || !address || !timing || !image) {
    res.status(400);
    throw new Error("Error in creating new resturant");
  }
  try {
    var sellerCheck = await Seller.findById(id);
    console.log("sellerCheck",sellerCheck);
    if(!sellerCheck)
    {
        res.status(400).json("Seller does not exist!");
        throw new Error("Error in creating new resturant");
    }


    let imageURL = await imageHelper.uploadImage(image);

    if (!imageURL) {
      res.status(400);
      throw new Error("Image Upload failed!");
    }


    
    var resturant = await Resturant.create({
      name,
      location,
      address,
      timing,
      image:imageURL,
      sellerId:id,
      offer,
      tags,
      minPrice:"199",
      maxPrice:"700"


    });

    if(resturant)
    {
      res.status(200).json(resturant);
    }

    res.status(400);
      throw new Error("Error in resturant creation!");
   


  } catch (e) {
    console.log("error", e);
  }
});

//@desc update resturant
//@route POST /api/resturant/:id
//@access public
const updateResturant = asyncHandler(async (req,res) => {
if(!req.params.id)
{
  res.status(400);
    throw new Error("Error in updating resturant");
}

  const updatedResturant = await Resturant.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if(updatedResturant)
  {
     res.status(200).json(updatedResturant);
  }
  else
  {
    res.status(400);
    throw new Error("Error in updating resturant");
  }

 
});

module.exports = {allResturant,newResturant,getResturantByLocation,updateResturant, getResturantById};
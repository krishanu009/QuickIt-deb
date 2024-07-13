const asyncHandler = require("express-async-handler");

const Resturant = require("../models/resturantModels");
const Seller = require("../models/sellerModel");

//@desc get resturant
//@route GET /api/resturant
//@access public

const allResturant = asyncHandler(async (req,res) => {
let resturant = await Resturant.find();
res.status(200).json(resturant);
});





//@desc Create new resturant
//@route POST /api/resturant
//@access public

const newResturant = asyncHandler(async (req, res) => {
  let { name, location, sellerId, address, timing, menuId, phone, image } =
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
    
    var resturant = await Resturant.create({
      name,
      location,
      address,
      timing,
      image,
      sellerId:id

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

module.exports = {allResturant,newResturant};
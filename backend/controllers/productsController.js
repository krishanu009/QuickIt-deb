const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const Resturant = require("../models/resturantModels");
const imageHelper = require("../helper functions/imageUpload");
//@desc Get all products by resturant id
//@route GET /api/prducts/:resturantId
//@access public

const getProductByResturantId = asyncHandler(async (req, res) => {
  const { resturantId } = req.params;
  console.log("resturantId", resturantId);
  if (!resturantId) {
    res.status(400);
    throw new Error("All Fields are mandatory!");
  }

  try {
    const products = await Product.find({ resturantId });

    res.status(200).json(products);
  } catch (e) {
    console.log("error", e);
  }
});

//@desc Create new product
//@route POST /api/product
//@access public

const newProduct = asyncHandler(async (req, res) => {
  const { name, image, price, sellingPrice, resturantId, tags, veg, description, quantity, rating  } = req.body;
  console.log("req body", req.body);
  if (!name || !image || !price || !sellingPrice || !resturantId || !description || !quantity ) {
    res.status(400);
    throw new Error("Please enter the mandatory fields!");
  }

  try {
    let id = req.user.id;

    console.log("new product", req.user.id);
    if (!id) {
      res.status(400);
      throw new Error("Error in creating new resturant");
    }

    let resturantCheck = await Resturant.findOne({ _id: resturantId, sellerId: id });
    console.log("resturantCheck", resturantCheck);
    if (!resturantCheck) {
      res.status(400);
      throw new Error("Resturant does not exit or belong to this seller!");
    }


    let imageURL = await imageHelper.uploadImage(image);

    if (!imageURL) {
      res.status(400);
      throw new Error("Image Upload failed!");
    }

    console.log("imageURL",imageURL);

    const product = await Product.create({
      name,
      image:imageURL,
      price,
      sellingPrice,
      resturantId,
      tags,
      sellerId: id,
      veg,
      description,
      quantity,
      rating
    });

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(400);
      throw new Error("product data is not valid!");
    }
  } catch (e) {
    console.log("error", e);
  }
});

//@desc Create new product
//@route POST /api/product
//@access public

const updateProduct =  asyncHandler( async(req,res)=> {
  if(!req.params.id)
    {
      res.status(400);
        throw new Error("Error in updating product");
    }
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
  
    if(updatedProduct)
    {
       res.status(200).json(updatedProduct);
    }
    else
    {
      res.status(400);
      throw new Error("Error in updating product");
    }

});

  




module.exports = { newProduct, getProductByResturantId,updateProduct};

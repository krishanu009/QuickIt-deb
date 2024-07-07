const asyncHandler = require("express-async-handler");
const Product = require('../models/productModel');

//@desc Get all products by resturant id
//@route GET /api/prducts/:resturantId
//@access public

const getProductByResturantId  =  asyncHandler(async(req, res) =>{
    const {resturantId} = req.params;
     console.log("resturantId",resturantId);
    if(!resturantId)
    {
        res.status(400);
        throw new Error("All Fields are mandatory!");
    }

    try{
        const products = await Product.find({resturantId});
    
        res.status(200).json(products);
    }
    catch(e)
    {
        console.log("error",e);
    }
    

});


//@desc Create new product
//@route POST /api/product
//@access public

const newProduct = asyncHandler(async(req,res) => {

    const {name, image, price, sellingPrice, resturantId, tags } = req.body;
    if(!name || !image || !price || !sellingPrice || !resturantId )
    {
        res.status(400);
        throw new Error("Please enter the mandatory fields!");
    }

   try{

    const product = await Product.create({
        name,image,price,sellingPrice,resturantId,tags
    })

    if(product)
    {
        res.status(200).json(product);
    }
    else{
        res.status(400);
        throw new Error("product data is not valid!");
    }

   }
   catch(e)
   {
       console.log("error",e);
   }

});


module.exports = {newProduct, getProductByResturantId};
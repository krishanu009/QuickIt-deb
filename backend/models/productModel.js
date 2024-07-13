const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
    name:{
        type:String,
        required: [true, "please add the product name"]
    },
    image:{
        type:String,
        required: [true, "Please add the image"]
    },
    price:{
        type:String,
        required:[true, "please add price"]
    },
    sellingPrice:{
        type:String,
        required:[true,"PLease add the seeling price"]
    },
    resturantId:{
        type:String,
        required:[true,"Please add the resturantId"]
    },
    sellerId:{
        type:String,
        required:[true,"Please add the sellerId"]
    },
    tags:[]
   
    

})

module.exports = mongoose.model("Products",productSchema);
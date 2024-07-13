const mongoose =  require("mongoose");
const resturantScehma = mongoose.Schema({
    name:{
        type:String,
        required:[true,"PLease add the name"]
    },
    location:{
        type:String,
        required:[true,"Please add the location"],
        
    },
    sellerId:{type:String,
        required:[true,"Please add the sellerId"]
    },
    address:{
        type:String,
        required:[true,"PLease add the address"]
    },
    timing:[{day:String,open:String,close:String}],
    days:[],
    menuId:String,
    phone:String,
    image:String
    
})

module.exports = mongoose.model("Resutant",resturantScehma);
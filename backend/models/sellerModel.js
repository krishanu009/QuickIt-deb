const mongoose = require("mongoose");
const sellerSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"PLease add the name"]
    },
    email:{
        type:String,
        required:[true,"PLease add the email"],
        unique: [true, "Email address already exists"]
    },
    password:{
        type:String,
        required:[true,"PLease add the password"],
    }
})

module.exports = mongoose.model("Seller",sellerSchema);
const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
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
    }, 
    phone:{
        type:String,
        required:[true,"PLease add the phone"],
    },
    address:[{
        name:{
            type:String
        },
        phone:{
            type:String
        },
        apartment:{
            type:String
        },
        addressLine1:{
            type:String
        },
        city:{
            type:String
        },
        state:{
            type:String
        },
        pin:{
            type:String
        }

    }]
})
module.exports = mongoose.model("User",userSchema);

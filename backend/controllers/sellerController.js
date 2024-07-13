const asyncHandler = require("express-async-handler");

const Seller = require("../models/sellerModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc Get all seller
//@route GET /api/seller
//@access public

const getAllSeller = asyncHandler(async (req, res) => {
  const seller = await Seller.find();
  res.status(200).json(seller);
});

//@desc create new seller
//@route POST /api/seller/register
//@access public
const newSeller = asyncHandler(async (req, res) => {
  let { name, email, password } = req.body;

  if (!email || !name || !password) {
    res.status(400);
    throw new Error("All the fields are mandatory");
  }
try{
    var sellerCheck = await Seller.findOne({ email });
}
catch(e)
{
    console.log("error",e);
}
  

  if (sellerCheck) {
    res.status(400);
    throw new Error("User already exist");
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);

    const seller = await Seller.create({
      name,
      email,
      password: hashedPassword,
    });

    if (seller) {
      const accesToken = jwt.sign(
        {
          user: {
            email: seller.email,
            name: seller.name,
            id: seller.id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "30m",
        }
      );

      res.status(200).json({
        _id: seller.id,
        email: seller.email,
        accesToken,
        name: seller.name,
      });
    } else {
      res.status(400);
      throw new Error("Seller data is not valid!");
    }
  }
});


//@desc Seller Login
//@route POST /api/seller/login
//@access public

const loginSeller = asyncHandler(async (req,res)=> {

    let {email, password } = req.body;

    if(!email || !password) 
    {
        res.status(400);
        throw new Error("All the fields are mandatory!");

    }

    console.log("email",email);
    console.log("password",password);
     try{
        var seller = await Seller.findOne({email});

        if(seller && (await bcrypt.compare(password,seller.password)))
            {
                const accesToken = jwt.sign(
                    {
                      user: {
                        email: seller.email,
                        name: seller.name,
                        id: seller.id,
                      },
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    {
                      expiresIn: "30m",
                    }
                  );
                  res.status(200).json(accesToken);
        
            }
            else
            {
                res.status(401).json("Seller email is not registered");
                throw new Error("Seller email is not registered");
            }
     }
     catch(e)
     {
         console.log("error",e);
     }

    

    

});

//@desc get current seller info
//@route GET /api/seller/current
//@access public

const currentUser = asyncHandler(async (req, res) => {
  console.log("here");
  res.status(200).json(req.user);
});


module.exports = {getAllSeller,loginSeller,newSeller,currentUser}




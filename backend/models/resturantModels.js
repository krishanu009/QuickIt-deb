const mongoose = require("mongoose");
const resturantScehma = mongoose.Schema({
  name: {
    type: String,
    required: [true, "PLease add the name"],
  },
  location: {
    type: String,
    required: [true, "Please add the location"],
  },
  sellerId: { type: String, required: [true, "Please add the sellerId"] },
  address: {
    type: String,
    required: [true, "PLease add the address"],
  },
  timing: [{ day: String, open: String, close: String }],
  days: [],
  tags: [],
  offer: String,
  menuId: String,
  phone: String,
  image: String,
  maxPrice: {
    type: String,
    default: "",
  },
  minPrice: {
    type: String,
    default: "",
  },

  rating: {
    count: {
      type: String,
      default: "0",
    },
    value: {
      type: String,
      default: "0",
    },
  },
});

module.exports = mongoose.model("Resutant", resturantScehma);

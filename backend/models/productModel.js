const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "please add the product name"],
  },
  image: {
    type: String,
    required: [true, "Please add the image"],
  },
  price: {
    type: String,
    required: [true, "please add price"],
  },
  sellingPrice: {
    type: String,
    required: [true, "PLease add the seeling price"],
  },
  resturantId: {
    type: String,
    required: [true, "Please add the resturantId"],
  },
  sellerId: {
    type: String,
    required: [true, "Please add the sellerId"],
  },
  tags: [],
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

  veg: {
    type: Boolean,
    required: [true, "Please add veg"],
  },
  description: {
    type: String,
    required: [true, "Please add description"],
  },
  orders: {
    type: String,
    default: "0",
  },

  quantity: {
    type: String,
    default: "0",
  },
});

module.exports = mongoose.model("Products", productSchema);

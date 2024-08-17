const asyncHandler = require("express-async-handler");

const Resturant = require("../models/resturantModels");


//@desc get resturant or food
//@route GET /api/search/:location/:searchQuery
//@access public
const searchRestaurantByName = async (req, res) => {
    try {
      const { location, searchQuery } = req.params;
  
      // Find restaurants where the name contains the search query (case-insensitive)
      const restaurants = await Restaurant.find({
        name: { $regex: searchQuery, $options: 'i' }
      });
  
      if (restaurants.length === 0) {
        return res.status(404).json({ message: 'No restaurants found' });
      }
  
      res.status(200).json(restaurants);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  
  module.exports = { searchRestaurantByName };
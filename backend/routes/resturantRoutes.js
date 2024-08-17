const express = require('express');
const validateToken = require('../middlewear/validateTokenHandler');
const router = express.Router();
const {newResturant,allResturant, getResturantByLocation,updateResturant, getResturantById,getResturantDistance,searchRestaurantByName} = require('../controllers/resturantController');

router.get("/", allResturant).get("/search/byLocation/:location/:searchQuery",searchRestaurantByName).get("/current/distance",getResturantDistance).get("/:location",getResturantByLocation).post("/:id",updateResturant).get("/by/:_id",getResturantById);

router.post("/", validateToken, newResturant);

module.exports = router;
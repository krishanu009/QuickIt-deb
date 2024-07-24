const express = require('express');
const validateToken = require('../middlewear/validateTokenHandler');
const router = express.Router();
const {newResturant,allResturant, getResturantByLocation,updateResturant, getResturantById} = require('../controllers/resturantController');

router.get("/", allResturant).get("/:location",getResturantByLocation).post("/:id",updateResturant).get("/by/:_id",getResturantById);

router.post("/", validateToken, newResturant);

module.exports = router;
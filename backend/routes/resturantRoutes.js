const express = require('express');
const validateToken = require('../middlewear/validateTokenHandler');
const router = express.Router();
const {newResturant,allResturant, getResturantByLocation,updateResturant} = require('../controllers/resturantController');

router.get("/", allResturant).get("/:location",getResturantByLocation).post("/:id",updateResturant);

router.post("/", validateToken, newResturant);

module.exports = router;
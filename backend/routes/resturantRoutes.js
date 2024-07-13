const express = require('express');
const validateToken = require('../middlewear/validateTokenHandler');
const router = express.Router();
const {newResturant,allResturant} = require('../controllers/resturantController');

router.get("/", allResturant);

router.post("/", validateToken, newResturant);

module.exports = router;
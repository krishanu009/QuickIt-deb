const express = require('express');

const router = express.Router();
const {newProduct, getProductByResturantId} = require('../controllers/productsController');

router.route("/").post(newProduct);

router.route("/:resturantId").get(getProductByResturantId);

module.exports = router;


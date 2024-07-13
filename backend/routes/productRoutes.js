const express = require('express');
const validateToken = require('../middlewear/validateTokenHandler');
const router = express.Router();
const {newProduct, getProductByResturantId} = require('../controllers/productsController');

router.post("/", validateToken, newProduct);
router.route("/:resturantId").get(getProductByResturantId);

module.exports = router;


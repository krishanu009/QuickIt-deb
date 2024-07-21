const express = require('express');
const validateToken = require('../middlewear/validateTokenHandler');
const router = express.Router();
const {newProduct, getProductByResturantId,updateProduct} = require('../controllers/productsController');

router.post("/", validateToken, newProduct).post("/:id",validateToken,updateProduct);
router.route("/:resturantId").get(getProductByResturantId);

module.exports = router;


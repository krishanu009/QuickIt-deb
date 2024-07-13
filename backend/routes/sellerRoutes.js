const express = require('express');
const validateToken = require('../middlewear/validateTokenHandler');
const router = express.Router();
const {getAllSeller,loginSeller,newSeller,currentUser} = require('../controllers/sellerController');


router.route("/").get(getAllSeller);

router.route("/register").post(newSeller);
router.route("/login").post(loginSeller);
router.get("/current", validateToken, currentUser);

module.exports = router;
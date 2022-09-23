const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const { ensureAuth, ensureGuest } = require("../middleware/auth");


//auth
// router.get("/login", authController.getLogin);
// router.post("/login", authController.postLogin);
// router.get("/logout", authController.logout);

// router.get("/signup", authController.getSignup);
// router.post("/signup", authController.postSignup);

//profile
router.get("/profile", ensureAuth, userController.getProfile);  
router.get("/edit-profile", userController.editProfile);

router.post("/edit-profile", userController.saveProfile);

module.exports = router;

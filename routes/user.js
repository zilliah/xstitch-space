const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
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

router.get("/edit-profile", ensureAuth, userController.editProfile);
router.put("/edit-profile", ensureAuth, upload.array("avatar", 2), userController.saveProfile);

module.exports = router;

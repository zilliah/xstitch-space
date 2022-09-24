const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const userController = require("../controllers/user");
const { ensureAuth, ensureGuest } = require("../middleware/auth");


router.get("/profile", ensureAuth, userController.getProfile);  

router.get("/edit-profile", ensureAuth, userController.editProfile);
router.put("/edit-profile", ensureAuth, upload.single("profilePic"), userController.saveProfile);


module.exports = router;

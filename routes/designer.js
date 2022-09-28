const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const designerController = require("../controllers/designer");
const { ensureAuth, ensureGuest } = require("../middleware/auth");


//TODO do i want to separate designer and user profiles?
// router.get("/profile", ensureAuth, designerController.getProfile);  

router.get("/edit-profile", ensureAuth, designerController.editProfile);
router.put("/edit-profile", ensureAuth, upload.single("file"), designerController.saveProfile);

module.exports = router;

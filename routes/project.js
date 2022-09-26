const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const projectController = require("../controllers/project");
const { ensureAuth, ensureGuest } = require("../middleware/auth");


router.get("/create", ensureAuth, projectController.createProject);
router.post("/create", ensureAuth, upload.single("file"), projectController.saveProject);

router.get("/:id", ensureAuth, projectController.getProject);

//TODO add edit and delete later

module.exports = router;
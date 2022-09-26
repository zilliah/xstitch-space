const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const projectController = require("../controllers/project");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// router.get("/:id", ensureAuth, projectController.getProject);

router.get("/create", ensureAuth, projectController.createProject);
router.post("/create", upload.single("projectPhoto"), projectController.saveProject);

//TODO add edit and delete later

module.exports = router;
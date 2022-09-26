const cloudinary = require("../middleware/cloudinary");
const Project = require("../models/Project");

module.exports = {

  getProject: async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        res.render("project/project.ejs", { project: project, user: req.user });
    } catch (err) {
        console.log(err);
    }
  },
  createProject: async (req, res) => {
    try {
        res.render("project/create.ejs", { user: req.user });
    } catch (err) {
        console.log(err);
    }
  },
  saveProject: async (req, res) => {
    try {
      // Upload image to cloudinary
      let cloudId, cloudUrl;
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        cloudId = result.public_id;
        cloudUrl = result.secure_url;
      }

      let validatedUrl;
      if (!req.body.patternLink.match(/^https?:\/\//)) {
        validatedUrl = "https://" + req.body.patternLink;
      } else {
        validatedUrl = req.body.patternLink;
      }

      await Project.create({
          title: req.body.title,
          patternName: req.body.patternName, 
          patternLink: validatedUrl,
          // patternId: TODO once patterns exist
          stitchedBy: req.user.id,
          startDate: req.body.startDate || Date.now(), 
          finishDate: req.body.finishDate,
          img: cloudUrl || "https://res.cloudinary.com/dwpjg7oqj/image/upload/v1664223095/favicon-32x32_etl5zr.png",
          cloudinaryId: cloudId || "",
          notes: req.body.notes,
      });

      console.log("Project has been added!");
      res.redirect("/user/profile");

    } catch (err) {
        console.log(err);
    }
  },
};

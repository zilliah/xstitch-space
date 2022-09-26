const cloudinary = require("../middleware/cloudinary");
const Project = require("../models/Project");

module.exports = {

  getProject: async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        res.render("/project/project.ejs", { project: project, user: req.user });
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
      console.log(req.body);
      // Upload image to cloudinary
      let cloudId, cloudUrl;
      const result = await cloudinary.uploader.upload(req.file.path);
      if (result) {
        cloudId = result.public_id;
        cloudUrl = result.secure_url;
      }

        await Project.create({
            title: req.body.title,
            patternName: req.body.patternName, 
            patternLink: req.body.patternLink,
            // patternId: TODO once patterns exist
            stitchedBy: req.user.id,
            startDate: req.body.startDate || Date.now(), 
            finishDate: req.body.finishDate,
            img: cloudUrl || "",
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

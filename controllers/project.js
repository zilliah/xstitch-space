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
      // Upload image to cloudinary
      //TODO figure out how to fix this -______________-
    //   const result = await cloudinary.uploader.upload(req.file.path);

        const date = req.body.startDate || Date.now();
        console.log(req.body)
        console.log(req.body.patternName)
        console.log(req.body.notes)

        await Project.create({
            title: req.body.title,
            patternName: req.body.patternName, 
            patternLink: req.body.patternLink,
            // patternId: TODO once patterns exist
            stitchedBy: req.user.id,
            startDate: date, 
            finishDate: req.body.finishDate,
            // img: result.secure_url,
            // cloudinaryId: result.public_id,
            notes: req.body.notes,
        });

        console.log("Project has been added!");
        res.redirect("/user/profile");

    } catch (err) {
        console.log(err);
    }
  },
};

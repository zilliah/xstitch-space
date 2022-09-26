const cloudinary = require("../middleware/cloudinary");
const User = require("../models/User");
const Project = require("../models/Project")

module.exports = {
  getProfile: async (req, res) => {
    try {
      const projects = await Project.find({ stitchedBy: req.user.id}).sort({ startDate: "desc"}).lean();
      res.render("user/profile.ejs", { user: req.user, projects: projects });
    } catch (err) {
      console.log(err);
    }
  },
  editProfile: async (req, res) => {
    try {
      res.render("user/edit-profile.ejs", { user: req.user });
    } catch (err) {
        console.log(err);
    }
  },
  saveProfile: async (req, res) => {
    try {
      // const isDesigner = req.body.designer;
      //TODO desginerId needs to be done to get the ref from it
      // if (req.body.designer)
      console.log(req.body)

      let cloudId, cloudUrl;
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        cloudId = result.public_id;
        cloudUrl = result.secure_url;
      }
      await User.findOneAndUpdate(
        {_id: req.user.id}, 
        {
          bio: req.body.bio, 
          profilePic: cloudUrl || "",
          cloudinaryId: cloudId || "",
          createdProfile: true,
        }
      );

      res.redirect("/user/profile");
    } catch (err) {
        console.log(err);
    }
  },
};

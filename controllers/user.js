const cloudinary = require("../middleware/cloudinary");
const User = require("../models/User");

module.exports = {
  getProfile: async (req, res) => {
    try {
      res.render("user/profile.ejs", { user: req.user });
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
      let cloudId, cloudUrl;
      const result = await cloudinary.uploader.upload(req.file.path);
      if (result) {
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

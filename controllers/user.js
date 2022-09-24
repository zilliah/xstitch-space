const cloudinary = require("../middleware/cloudinary");
const User = require("../models/User");
const Designer = require("../models/Designer");

module.exports = {
  getProfile: async (req, res) => {
    try {
      if (req.user.designerId) {
        const designer = Designer.findOne({ userId: req.user._id});
        res.render("user/profile.ejs", { user: req.user, designer: designer });
      } 
      else res.render("user/profile.ejs", { user: req.user });
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

      const designerId = Designer.findOne({ userId: req.user._id})._id;
      let cloud;
      if (req.body.profilePic) {
        cloud = await (await cloudinary.uploader.upload(req.file.path)).secure_url;
      } 
      await User.findOneAndUpdate(
        {_id: req.user.id}, 
        {
          bio: req.body.bio, 
          profilePic: cloud,
          createdProfile: true,
          designerId: designerId,
        }
      );

      res.redirect("/user/profile");
    } catch (err) {
        console.log(err);
    }
  },
};

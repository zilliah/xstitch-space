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

      //TODO don't do this here, do it with designer profile creation
      // const designerId = Designer.findOne({ userId: req.user._id})._id;

      let cloudiD, cloudUrl;
      if (req.body.profilePic) {
        const cloud = await cloudinary.uploader.upload(req.file.path);
        cloudId = cloud.public_id;
        cloudUrl = cloud.secure_url;
      }

      console.log(cloudId, cloudUrl)

      await User.findOneAndUpdate(
        {_id: req.user.id}, 
        {
          bio: req.body.bio, 
          profilePic: cloudUrl,
          cloudinaryId: cloudiD,
          createdProfile: true,
          designerId: designerId,
        }
      );
      console.log("User profile updated");
      res.redirect("/user/profile");
    } catch (err) {
        console.log(err);
    }
  },
};

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
      console.log("saving stuff");
      // console.log(req.user);
      // console.log(req.body);

      const isDesigner = req.body.designer;
      
      //TODO desginerId needs to be done to get the ref from it
      // if (req.body.designer)
      let cloud;      
      if (req.body.profilePic) {
        let cloud = await (await cloudinary.uploader.upload(req.file.path)).secure_url;
      } 
      await User.findOneAndUpdate(
        {_id: req.user.id}, 
        {
          bio: req.body.bio, 
          profilePic: cloud,
          createdProfile: true,
        }
      );

      res.redirect("/user/profile");
    } catch (err) {
        console.log(err);
    }
  },
};

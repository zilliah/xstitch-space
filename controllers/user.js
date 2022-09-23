const cloudinary = require("../middleware/cloudinary");
const User = require("../models/User");
const Designer = require("../models/Designer");

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

      //TODO desginerId needs to be done to get the ref from it
      //TODO need to check if already a designer for that user! 
        //and update if it exists already
        //use upsert here
      if(req.body.designer) {
        try {
          let cloud;
          if (req.body.logo) {
            cloud = await cloudinary.uploader.upload(req.file.path).secure_url;
          }

          await Designer.create({
            name: req.body.designerName,
            site: req.body.site,
            userId: req.user._id,
            logo: cloud,
          });
        } catch (err) {
          console.log(err);
        }
      }

      const designerId = Designer.findOne({ userId: req.user._id})._id;
      let cloud;
      if (req.body.profilePic) {
        cloud = await cloudinary.uploader.upload(req.file.path).secure_url;
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

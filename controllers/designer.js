const cloudinary = require("../middleware/cloudinary");
const User = require("../models/User");
const Designer = require("../models/Designer");

module.exports = {
//   getProfile: async (req, res) => {
//     try {
//       res.render("designer/profile.ejs", { user: req.user });
//     } catch (err) {
//       console.log(err);
//     }
//   },

  editProfile: async (req, res) => {
    try {
      res.render("designer/edit-profile.ejs", { user: req.user });
    } catch (err) {
        console.log(err);
    }
  },
  saveProfile: async (req, res) => {
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
            bio: req.body.bio,
        });

        //this isn't working TODO
        const designerId = Designer.findOne({ userId: req.user.id});
        await User.findOneAndUpdate(
            {_id: req.user.id}, 
            { designerId: designerId}
        );

        res.redirect("/user/profile");
        } catch (err) {
            console.log(err);
        }
    }   
};

const cloudinary = require("../middleware/cloudinary");
const User = require("../models/User");
const Designer = require("../models/Designer");
const user = require("./user");

module.exports = {
  editProfile: async (req, res) => {
    try {
      res.render("designer/edit-profile.ejs", { user: req.user });
    } catch (err) {
        console.log(err);
    }
  },
  saveProfile: async (req, res) => {
    try {
        let cloudiD, cloudUrl;
        if (req.body.logo) {
            cloud = await cloudinary.uploader.upload(req.file.path).secure_url;
            cloudId = cloud.public_id;
            cloudUrl = cloud.secure_url;
        }

        //need to manage creating vs updating
        const newDesigner = await Designer.findOneAndUpdate(
            { _id: user.designerId },
            {
                name: req.body.designerName,
                site: req.body.site,
                userId: req.user._id,
                logo: cloudUrl,
                cloudinaryId: cloudiD,
                bio: req.body.bio,
                sellOnsite: req.body.onsiteSell
            }, 
            { upsert: true }
        );


        console.timeLog(newDesigner);

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

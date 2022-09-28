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
        let cloudId, cloudUrl;
        if (req.file) {
            cloud = await cloudinary.uploader.upload(req.file.path);
            cloudId = cloud.public_id;
            cloudUrl = cloud.secure_url;
        }



        if (user.designerId) {
            //they're already a designer
            //update info
            const newDesigner = await Designer.findOneAndUpdate(
                { _id: user.designerId },
                {
                    name: req.body.designerName,
                    site: req.body.site,
                    userId: req.user._id,
                    logo: cloudUrl,
                    cloudinaryId: cloudId,
                    bio: req.body.bio,
                    sellOnsite: req.body.onsiteSell
                }, 
                { 
                    new: true //returns the new document (default is old one)
                }
            );


        } else {
            //they aren't a designer, create new designer acct
            const newDesigner = await Designer.create(
                {
                    name: req.body.designerName,
                    site: req.body.site,
                    userId: req.user._id,
                    logo: cloudUrl,
                    cloudinaryId: cloudId,
                    bio: req.body.bio,
                    sellOnsite: req.body.onsiteSell
                }, 
                { 
                    new: true //returns the new document (default is old one)
                }
            );
        }
        console.log("user's designer ID: " + req.user.designerId);
        console.log(newDesigner)


        //add new designer to DB
        //TODO this is working except i'm somehow setting the _id to null!
        //ok i think the upsert is the problem https://github.com/Automattic/mongoose/issues/7653
        //

        console.log(newDesigner);


        //this isn't working TODO
        // const designerId = Designer.findOne({ userId: req.user.id});
        // await User.findOneAndUpdate(
        //     {_id: req.user.id}, 
        //     { designerId: designerId}
        // );

        res.redirect("/user/profile");
        } catch (err) {
            console.log(err);
        }
    }   
};

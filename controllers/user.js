const Post = require("../models/User");

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
        //TODO: PUT or POST the bio form
    } catch (err) {
        console.log(err);
    }
  },
};

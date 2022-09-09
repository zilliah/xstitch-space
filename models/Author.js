const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    }, 
    site: {
        type: String
    }, 
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
    }, 
});

module.exports = mongoose.model("Author", AuthorSchema);
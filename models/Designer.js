const mongoose = require("mongoose");

const DesignerSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
    }, 
    site: {
        type: String, 
        unique: true,
    }, 
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
    }, 
    logo: String,
});

module.exports = mongoose.model("Designer", DesignerSchema);
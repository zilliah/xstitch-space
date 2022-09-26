const mongoose = require("mongoose")

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    patternName: { type: String },
    patternLink: { type: String },
    // patternId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Pattern"
    // }, 
    stitchedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true
    },
    startDate: {
        type: Date,
        default: Date.now()
    },
    finishDate: {
        type: Date
    },
    img: { type: String },
    cloudinaryId: { type: String },
    notes: { type: String },
});

module.exports = mongoose.model("Project", ProjectSchema);
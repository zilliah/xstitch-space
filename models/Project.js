const mongoose = require("mongoose")

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    pattern: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pattern"
    }, 
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
    img: [{String}],
    notes: [{
        type: Date, 
        type: String
    }]
});

module.exports = mongoose.model("Project", ProjectSchema);
const mongoose = require("mongoose");

const PatternSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
    }, 
    DesignerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Designer",
    },
    externalPatternLink: {
        type: String,
        unique: true,
    },
    img: [{String}]
});

module.exports = mongoose.model("Pattern", PatternSchema);
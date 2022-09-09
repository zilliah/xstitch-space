const mongoose = require("mongoose");

const PatternSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
    }, 
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author",
    },
    externalPatternLink: {
        type: String,
        unique: true,
    },
    img: [{String}]
});

module.exports = mongoose.model("Pattern", PatternSchema);
const mongoose = require("mongoose");

const FlossSchema = new mongoose.Schema({
    brand: String, 
    line: String, 
    name: String, 
    photo: String,
    hex: String, 
    colorFamily: [{String}]
});

module.exports = mongoose.model("Floss", FlossSchema);
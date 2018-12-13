const mongoose = require("mongoose");
const { dateOptions, emailRegex } = require("./variables");

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: emailRegex
    },
    password: { type: String, required: true }
}, dateOptions);

module.exports = mongoose.model("User", userSchema);
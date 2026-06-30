const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    verified: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("User",userSchema);
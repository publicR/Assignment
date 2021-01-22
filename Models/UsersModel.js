var mongoose = require("mongoose");
const { strict } = require("assert");
var schema = mongoose.Schema;
var users = new schema({
    userName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,

    },
    lastName: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true
    },
}, { timestamps: true });

module.exports = mongoose.model("users", users); 
var mongoose = require("mongoose");
var schema = mongoose.Schema;
var users = new schema({
    userName: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    firstName: {
        type: String,
        require: true,

    },
    lastName: {
        type: Number,
        require: true,
    },
    mobile: {
        type: Number,
        require: true,
    },
    isActive: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

module.exports = mongoose.model("users", users); 
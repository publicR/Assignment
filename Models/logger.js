var mongoose = require("mongoose");

var logger = new mongoose.Schema({
    RequetBody: { type: Array },
    ResponseBody: { type: Array },
    method: { type: String, required: false },
    requestUrl: { type: String, required: false },
    hostname: { type: String, required: false },
    reqheaders: { type: Array },
    Requestip: { type: String, required: false },
    statusCode: { type: String, required: false, default: true },
}, { timestamps: true });

module.exports = mongoose.model("logger", logger);
var express = require('express');
var app = express();
var path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;
require('dotenv').config()
var dblogger = require('./Models/logger');
const http = require('http').createServer(app)





app.use(cors());
app.use(bodyParser.urlencoded({ limit: '200mb', extended: true, parameterLimit: 1000000 }));
app.use(bodyParser.json({ limit: '200mb' }));

app.use((req, res, next) => {
    next();
});




var MONGODB_URL =  'mongodb://localhost/assignment'
mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to %s", MONGODB_URL);
        console.log("App is running ... \n");
        console.log("Press CTRL + C to stop the process. \n");
    })
    .catch(err => {
        console.error("App starting error:", err.message);
        process.exit(1);
    });
var db = mongoose.connection;
app.use((req, res, next) => {
    dbloggerSave = new dblogger();
    console.log('object ' + dbloggerSave);
    dbloggerSave.RequetBody = req.body;
    dbloggerSave.ResponseBody = res.body;
    dbloggerSave.method = req.method;
    dbloggerSave.hostname = req.hostname;
    dbloggerSave.reqheaders = req.headers;
    dbloggerSave.requestUrl = req.url;
    dbloggerSave.dRequestip = req.connection.remoteAddress;
    dbloggerSave.requestPort = req.connection.remotePort;
    dbloggerSave.statusCode = res.statusCode;
    dbloggerSave.save(function (err) {
        if (err) {
            console.log(err);
            res.status(400);
            res.send(err);
        }
        else {
            console.log('success logged')
            res.status(200);
        }
    });
    next();
});


require('./Routes')(app);


var jsn = {"Status":"Your Server Is Started Now"}
app.get('/*', (req, res) => {
res.send(jsn)
});

app.use(express.static(__dirname + '/Public'))



http.listen(port, function () {
    console.log('Server started Port', port);
});

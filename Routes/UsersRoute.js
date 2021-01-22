var UsersController = require("../Controllers/UsersController");





module.exports = (app) => {
    app.post("/user-register", UsersController.singleUserRegister);
    app.post("/user-login", UsersController.userLogin);
    // app.post("/register3rdStepOtpvrfy", auth.authentication, classifiedRegstr.register3rdStepOtpvrfy);
};
var UserDb = require('../Models/UsersModel')
const bcrypt = require('bcrypt');
const { body, validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const apiResponse = require("../Components/apiresponse");
var moment = require('moment')


module.exports.singleUserRegister = [
    body("firstName").isLength({ min: 1 }).trim().withMessage("First name must be specified."),
    body("mobile").isLength({ min: 1 }).trim().withMessage("mobile must be specified."),
    body("password").isLength({ min: 1 }).trim().withMessage("password must be specified."),
    body("lastName").isLength({ min: 1 }).trim().withMessage("Last name must be specified."),
    body("userName").isLength({ min: 1 }).trim().withMessage("userName must be specified."),
    body("isActive").isLength({ min: 1 }).trim().withMessage("isActive must be specified."),
    sanitizeBody("firstName").escape(),
    sanitizeBody("lastName").escape(),
    (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
           } else {
                bcrypt.hash(req.body.password, 10, function (err, hash) {
                    req.body.password = hash
                    req.body.userName = req.body.userName.toLowerCase();
                    var info = new UserDb(req.body).save(function (err, succ) {
                        if (err) { return apiResponse.ErrorResponse(res, err); }
                        return apiResponse.successResponseWithData(res, "Your accout has been created successfully", succ);
                    });
                });
            }
        } catch (err) {
            return apiResponse.ErrorResponse(res, err);
        }
    }];




module.exports.userLogin = [
                        body("userName").isLength({ min: 1 }).trim().withMessage("userName must be specified."),
                        body("password").isLength({ min: 1 }).trim().withMessage("password must be specified."),
                        sanitizeBody("userName").escape(),
                        (req, res) => {
                            console.log(req.body)
                            try {
                                const errors = validationResult(req);
                                if (!errors.isEmpty()) {
                                    return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
                                } else  {
                                    UserDb.findOne({ userName: req.body.userName.toLowerCase() }).exec(async (err, succ) => {
                                        if (err) {
                                            return apiResponse.ErrorResponse(res, err);
                                        } else if (!succ) {
                                            return apiResponse.unauthorizedResponse(res, "User name Is not Exist");
                                        } else if (succ.isActive === false) {
                                            return apiResponse.unauthorizedResponse(res, "User Is not Active");
                                        } else {
                                            bcrypt.compare(req.body.password, succ.password, function (err, same) {
                                                console.log("match==>", succ.password)
                                                if (!same) {
                                                    return apiResponse.unauthorizedResponse(res, "Incorrect Username Or Password");
                                                } else {
                                                    return apiResponse.successResponseWithData(res, "Successfully Login", userData);
                                                                
                                                }
                                            
                                            })
                                        }
                                        })
                                        }
                                    }catch (err) {
                                        return apiResponse.ErrorResponse(res, err);
                                    }
                                }]
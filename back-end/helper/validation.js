let validation = {};
const { check, validationResult } = require("express-validator");
const { failure } = require("./response");

const validatEmail = (email) => {
    const emailCheck = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailCheck.test(String(email).toLowerCase())
}

validation.signUpValidation = [
    check("name", "name is required").exists().notEmpty(),
    check("email", "email is not Empty").notEmpty().exists(),
    check("password", "password is required").exists().notEmpty(),
    check("password", "Password length should be 8").isLength({ min: 8 }),
    check("profilePic", "profilePic is required").notEmpty(),
    check("email", 'Email is not a valid email').custom((value) => validatEmail(value)),

];

validation.updateUserValidation = [
    check("email", "email is not Empty").notEmpty().exists(),
    check("email", 'Email is not a valid email').custom((value) => validatEmail(value)),

];

validation.deleteUserValidation = [
    check("email", "email is not Empty").notEmpty().exists(),
    check("email", 'Email is not a valid email').custom((value) => validatEmail(value)),
];

validation.resetPasswordValidation = [
    check("email", "email is not Empty").notEmpty().exists(),
    check("oldPassword", "password is required").exists().notEmpty(),
    check("oldPassword", "Password length should be 8").isLength({ min: 8 }),
    check("newPassword", "password is required").exists().notEmpty(),
    check("newPassword", "Password length should be 8").isLength({ min: 8 }),
    check("confirmPassword", "confirmPassword is required").notEmpty(),
    check("confirmPassword", "Password length should be 8").isLength({ min: 8 }),
]

validation.throwError = (req, res, next) => {
    console.log(`req.body`, req.body)
    const errors = validationResult(req).array();
    if (errors.length)
        return failure(res, 'Validation Error', errors[0], "Failure");
    next();
}

module.exports = validation;

const { checkDuplicateEmail } = require("../middleware");
const userController = require("../controllers/user.controller");
const express = require('express');
const router = express.Router();
const upload = require('../helper/upload')
const { signUpValidation, throwError, updateUserValidation, deleteUserValidation, resetPasswordValidation } = require('../helper/validation')

router.get("/list", userController.getAllUsers);
router.put("/update", upload.single('profilePic'), updateUserValidation, throwError, userController.updateUser);
router.delete("/delete", deleteUserValidation, throwError, userController.deleteUser);
router.post("/reset-password", resetPasswordValidation, throwError, userController.resetPassword);
router.post("/create", upload.single('profilePic'), signUpValidation, throwError, checkDuplicateEmail, userController.createUser);
module.exports = router
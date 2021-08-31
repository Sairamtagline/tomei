const authService = require("../services/user.service");
const { getAllUsers,deleteUser, resetPassword } = require("../services/user.service")

exports.deleteUser = deleteUser
exports.resetPassword = resetPassword
exports.getAllUsers = getAllUsers
exports.createUser = authService.signUpUser;
exports.updateUser = authService.updateUser;





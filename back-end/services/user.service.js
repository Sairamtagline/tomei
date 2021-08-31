const responseMessage = require("../config/messages");
const responseService = require("../helper/response");
var bcrypt = require("bcryptjs");
const db = require("../models");
const User = db.user;

exports.signUpUser = async (req, res) => {
  try {

    const { name, email, password } = req.body;
    const user = await User.create({
      name,
      email,
      profilePic: req.file.path,
      password: bcrypt.hashSync(password, 8)
    })
    return await responseService.success(
      res,
      responseMessage.registerSuccess,
      user
    );

  } catch (err) {
    console.log('err :>> ', err);
    return await responseService.failure(
      res,
      responseMessage.registerFailed
    );
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    return responseService.success(res, responseMessage.getAllUsersSuccess, users);
  } catch (err) {
    console.log(`err`, err)
    return responseService.failure(res, responseMessage.RequestFailed);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const userExist = await User.findOne({
      where: {
        email: email
      }
    });

    if (!userExist) return await responseService.failure(res, responseMessage.userNotFound)

    await User.update({
      ...(name && { name }),
      ...(req.file && req.file.path && { profilePic: req.file.path })
    }, { where: { email } });

    return await responseService.success(res, responseMessage.updateUserSuccess);

  } catch (err) {
    console.log(`err`, err)
    return await responseService.failure(res, responseMessage.RequestFailed);
  }
};

exports.deleteUser = async (req, res) => {
  try {

    const { email } = req.body;
    const user = await User.destroy({
      where: {
        email: email
      }
    });
    return await responseService.success(res, responseMessage.deleteUserSuccess, user);

  } catch (err) {
    console.log(`err`, err)
    return await responseService.failure(res, responseMessage.RequestFailed);
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword, confirmPassword } = req.body;
    const user = await User.findOne({
      where: {
        email
      },
    });
    if (!user)
      return await responseService.failure(res, responseMessage.userNotFound);
    if (!bcrypt.compareSync(oldPassword, user.password)) return await responseService.failure(res, "Old password doesn't match");

    if (newPassword === confirmPassword) {
      try {
        const result = await User.update(
          {
            password: bcrypt.hashSync(newPassword, 8),
          },
          {
            where: {
              email
            },
          }
        );
        if (result == 1) {
          return await responseService.success(
            res,
            "Password updated successfully"
          );
        }
      } catch (err) {
        console.log(`err`, err)
        return await responseService.failure(res, err);
      }
    } else {
      return await responseService.failure(
        res,
        "password and confirm password should be match"
      );
    }


  } catch (err) {
    console.log('err :>> ', err);
    return await responseService.failure(
      res,
      responseMessage.RequestFailed
    );
  }
};

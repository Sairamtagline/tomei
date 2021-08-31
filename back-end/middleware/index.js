const db = require("../models");
const User = db.user;
const responseMessage = require('../config/messages');
const responseService = require('../helper/response');

const checkDuplicateEmail = async (req, res, next) => {
  try {

    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    });

    if (user) return await responseService.failure(res, responseMessage.emailExist)

    next()
  } catch (error) {
    console.log(`error`, error)
    next()
  }
}

const verifySignUp = {
  checkDuplicateEmail,
};

module.exports = verifySignUp;

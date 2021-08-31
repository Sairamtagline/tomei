module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    name: {
      type: Sequelize.STRING(30),
      allowNull: false,
      validate: {
        notNull: { msg: "Name is required!!" },
      },
    },
    email: {
      type: Sequelize.STRING(30),
      allowNull: false,
      validate: {
        isEmail: true,
        notNull: { msg: "Email is required!!" },
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Password is required!!" },
      },
    },
    profilePic: {
      type: Sequelize.STRING,
      // defaultValue:''
      allowNull: false,
      validate: {
        notNull: { msg: "Profile picture is required!!" },
      },
    },
  });

  return User;
};
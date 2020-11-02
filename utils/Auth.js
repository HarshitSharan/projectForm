const User = require("../models/user");
const bcrypt = require("bcryptjs");
// const user = require("../models/user");

// @desc To register any user

const userRegister = async (userDets, role, res) => {
  try {
    //validate the user
    let userNameNotTaken = await validateuserName(userDets.username);
    if (!userNameNotTaken) {
      return res.status(400).json({
        message: `Username taken`,
        success: false,
      });
    }
    //validate the email
    let emailTaken = await validatemail(userDets.email);
    if (!emailTaken) {
      return res.status(400).json({
        message: `Email already registered`,
        success: false,
      });
    }

    //get the hashed password
    const hashed = await bcrypt.hash(userDets.password, 12);
    const newUser = new User({
      ...userDets,
      password: hashed,
      role: role,
    });

    await newUser.save();
    return res.status(201).json({
      message: "Registration successfull",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Faliure!!!",
      success: false,
    });
  }
};

const validateuserName = async (username) => {
  let user = await User.findOne({ username: username });

  if (user) {
    return false;
  } else {
    return true;
  }
};

const validatemail = async (email) => {
  let user = await User.findOne({ email: email });

  if (user) {
    return false;
  } else {
    return true;
  }
};

module.exports = {
  userRegister,
};

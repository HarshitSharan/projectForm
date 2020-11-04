const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

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

const userLogin = async (userCred, role, res) => {
  let { username, password } = userCred;

  //Check for User existance
  const user = await User.findOne({ username: username });
  console.log(user);
  if (!user) {
    return res.status(404).json({
      message: "You must register First",
      success: false,
    });
  }

  // console.log(user.role, role);

  // Role checking
  if (user.role !== role) {
    return res.status(403).json({
      message: "Access forbidden",
      success: false,
    });
  }

  //password validation
  let isValid = await bcrypt.compare(password, user.password);
  if (isValid) {
    let token = jwt.sign(
      {
        user_id: user._id,
        role: user.role,
        email: user.email,
        username: user.username,
      },
      process.env.APP_SECRET,
      { expiresIn: "100 days" }
    );

    let toReturn = {
      username: user.username,
      role: user.role,
      email: user.email,
      token: `Bearer ${token}`,
      expiresIn: 2400,
    };

    return res.status(200).json({
      ...toReturn,
      message: "SuccessFull login",
      success: true,
    });
  } else {
    return res.status(403).json({
      message: "Invalid password",
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

//passport middleware
const userAuth = passport.authenticate("jwt", { session: false });

const serializeUser = (user) => {
  return {
    username: user.username,
    email: user.email,
    _id: user._id,
    name: user.name,
    updatedAt: user.updatedAt,
    createdAt: user.createdAt,
  };
};

const checkRole = (roles) => (req, res, next) =>
  !roles.includes(req.user.role)
    ? res.status(401).json("Unauthorized")
    : next();

module.exports = {
  userRegister,
  userLogin,
  userAuth,
  serializeUser,
  checkRole,
};

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const generateLink = require('../utils/linkGenerator')

router.get("/login", (req, res) => {
  generateLink;
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});
// handle register
router.post("/register", (req, res) => {
  // console.log(req.body);
  // res.send("hello");
  const { name, email, password, password2 } = req.body;
  let error = [];

  //required feilds
  if (!name || !email || !password || !password2) {
    error.push({ msg: "Please fill all the feilds" });
  }

  //check Password
  if (password !== password2) {
    error.push({ msg: "Passwword didn't matched" });
  }

  //check password lenght
  if (password.length < 6) {
    error.push({ msg: "password must be of more than 6 characters" });
  }

  if (error.length > 0) {
    res.render("register", {
      error,
      name,
      email,
      password,
      password2,
    });
  } else {
    console.log("All Good!!!");
    User.findOne({ email: email }).then((user) => {
      if (user) {
        //User exist
        error.push({ msg: "Email already registered" });
        res.render("register", {
          error,
          name,
          email,
          password,
          password2,
        });
      } else {
        const newUser = new User({
          name,
          email,
          password,
        });
        //hash password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                req.flash("success_msg", "Registration SuccessFull!!");
                res.redirect("/users/login");
              })
              .catch((err) => console.log(err));
          });
        });
        console.log(newUser, "USer Saved");
        // res.send("User Saved");
      }
    });
  }
});

//Handle LOgin
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});

//Handle Logout
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "Logged out!!");
  res.redirect("/users/login");
});

module.exports = router;

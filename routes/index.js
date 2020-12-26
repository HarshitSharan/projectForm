const express = require("express");
const router = express.Router();
const { ensureAuthenticate } = require("../utils/Auth");

//Welcome page
router.get("/", (req, res) => {
  res.render("welcome");
});

//Dashboard
router.get("/dashboard", ensureAuthenticate, (req, res) => {
  res.render("dashboard", {
    name: req.user.name
  });
});

module.exports = router;

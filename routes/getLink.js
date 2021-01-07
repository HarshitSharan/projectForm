const express = require("express");
const router = express.Router();
const { ensureAuthenticate } = require("../utils/Auth");
const Link = require("../models/Link");

router.get("/", ensureAuthenticate, async (req, res) => {
  const adminId = req.user._id;
  const result = await Link.findOne({ adminId });
  if (result) {
    res.send(result.linkId);
  } else {
    res.status(500).json({
      msg: "Bad Request",
    });
  }
});

router.get("/public/:id", async (req, res) => {
  const publicFormID = req.params.id;
  console.log(publicFormID);
  const data = await Link.findOne({
    linkId: publicFormID,
  });
  res.send(data);
  // console.log(data);
});

module.exports = router;

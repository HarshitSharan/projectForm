const express = require("express");
const router = express.Router();
const { linkGenerator } = require("../utils/linkGenerator");
const { ensureAuthenticate } = require("../utils/Auth");
const { v4: uuidv4 } = require("uuid");

router.get("/", ensureAuthenticate, (req, res) => {
  const result = uuidv4();
  console.log(result);
  res.send(result);
});

module.exports = router;

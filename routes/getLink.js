const express = require("express");
const router = express.Router();
const generateLink = require('../utils/linkGenerator');
const { ensureAuthenticate } = require("../utils/auth");


router.get('/', ensureAuthenticate,(req, res) => {
    console.log(req);
})


module.exports = router;
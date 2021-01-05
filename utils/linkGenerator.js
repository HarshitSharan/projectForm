const { v4: uuidv4 } = require("uuid");
const Link = require("../models/Link");
const mongoose = require("mongoose");

const futureDateByDays = (days) => {
  return Math.floor((Date.now() + days * 86400000) / 1000);
};

const currrentTime = () => {
  return Math.floor(Date.now() / 1000);
};

const linkGenerator = async (req) => {
  // console.log(req.user._id);
  const expiryDate = futureDateByDays(10);
  const linkId = uuidv4().toString() + expiryDate.toString();
  const adminId = mongoose.Types.ObjectId(req.user._id);
  const formName = req.body.formName;
  const link = new Link({
    adminId,
    linkId,
    expiryDate,
  });
  link.linkId = linkId;
  link.expiryDate = expiryDate;
  link.adminId = adminId;
  link.formName = formName;
  // console.log("In generate Link Method" + link);
  const result = await link.save();
  return result;
};

module.exports = {
  linkGenerator,
};

const { v4: uuidv4 } = require("uuid");
const Link = require("../models/Link");

const futureDateByDays = (days) => {
  return Math.floor((Date.now() + days * 86400000) / 1000);
};

const currrentTime = () => {
  return Math.floor(Date.now() / 1000);
};

async function linkGenerator() {
  const expiryDate = futureDateByDays(10);
  const linkId = uuidv4().toString() + expiryDate.toString();
  const link = new Link({ linkId, expiryDate });
  link.linkId = linkId;
  link.expiryDate = expiryDate;
  const result = await link.save();
  // console.log(result);
  return result;
}

module.exports = {
  linkGenerator,
};

const { v4: uuidv4 } = require("uuid");
const Link = require("../models/Link");

const futureDateByDays = (days) => {
  return Math.floor((Date.now() + days * 86400000) / 1000);
};

const currrentTime = () => {
  return Math.floor(Date.now() / 1000);
};

module.exports = {
  async linkGenerator() {
    const linkId = uuidv4().toString();
    const expiryDate = futureDateByDays(10);
    const link = new Link(linkId, expiryDate);
    link.linkId = linkId;
    link.expiryDate = expiryDate;
    const result = await link.save();
    console.log(result);
    return result;
  },
};

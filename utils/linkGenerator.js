const { v4: uuidv4 } = require("uuid");
const Link = require("../models/Link");
const mongoose = require("mongoose");

const futureDateByDays = (days) => {
  return Math.floor((Date.now() + days * 86400000) / 1000);
};

const formQuestion = [];

const dataManipulator = (questionData, optionData, optionTypeData) => {
  for (var i = 0; i < questionData.length; i++) {
    var dataObj = {};
    key1 = "question";
    if (!(key1 in dataObj) || key1 in dataObj) {
      dataObj[key1] = {};
    }
    key2 = "option";
    if (!(key2 in dataObj) || key2 in dataObj) {
      dataObj[key2] = [];
    }
    key3 = "optionType";
    if (!(key3 in dataObj) || key3 in dataObj) {
      dataObj[key3] = {};
    }
    dataObj[key1] = questionData[i];
    optionData[i].forEach((option) => {
      dataObj[key2].push(option);
    });
    dataObj[key3] = optionTypeData[i];
    formQuestion.push(dataObj);
  }

  // console.log(formQuestion);
};

function clearArray(array) {
  while (array.length > 1) {
    array.pop();
  }
}

const linkGenerator = async (
  req,
  questionBody,
  optionBody,
  optionBodyType,
  name
) => {
  dataManipulator(questionBody, optionBody, optionBodyType);
  const expiryDate = futureDateByDays(10);
  const linkId = uuidv4().replace(/-/g, "") + expiryDate.toString();
  const adminId = mongoose.Types.ObjectId(req.user._id);
  const formName = name;
  const link = new Link();
  link.linkId = linkId;
  link.expiryDate = expiryDate;
  link.adminId = adminId;
  link.formName = formName;
  link.formQuestion = formQuestion;
  const result = await link.save();
  clearArray(formQuestion);
  return result;
};

module.exports = {
  linkGenerator,
};

const express = require("express");
const router = express.Router();
const { ensureAuthenticate } = require("../utils/Auth");
const { linkGenerator } = require("../utils/linkGenerator");
let ques = 1; //Store the No. of question
let opt = [1]; //Store the count of option for each question
let question_text = [""]; //Store the text of each Question
let option_text = [[""]]; //Store the array of options for each question
let option_type = ["radio"]; //Store the Option Type for each question

//Welcome page
router.get("/", (req, res) => {
  res.render("welcome");
});

//Dashboard
router.get("/dashboard", ensureAuthenticate, (req, res) => {
  res.render("dashboard", {
    question: ques,
    option: opt,
    option_type: option_type,
  });
});

router.get("/dashboard/changeOpt", (req, res) => {
  let qno = req.query.QuestionNumber;
  let type = req.query.type;
  switch (type) {
    case "c":
      option_type[qno] = "checkbox";
      break;
    case "sa":
      option_type[qno] = "text";
      break;
    case "r":
      option_type[qno] = "radio";
      break;
  }
  res.redirect("/dashboard");
});
//Add Question
router.get("/dashboard/AddQuestion", (req, res) => {
  ques++;
  opt.push(1);
  question_text.push("");
  option_type.push("radio");
  option_text.push([""]);

  res.redirect("/dashboard");
});

//Add Option
router.get("/dashboard/addOption", (req, res) => {
  let temp = req.query.QuestionNumber;
  opt[temp]++;
  res.redirect("/dashboard");
});

//Remove Question
router.get("/dashboard/RemoveQuestion", (req, res) => {
  let temp = req.query.QuestionNumber;
  ques--;
  opt.splice(temp, 1);
  option_type.splice(temp, 1);
  res.redirect("/dashboard");
});

//Remove Option
router.get("/dashboard/RemoveOption", (req, res) => {
  let temp = req.query.QuestionNumber;
  if (opt[temp] != 1) {
    opt[temp]--;
  }
  res.redirect("/dashboard");
});

//Submit form
router.post("/dashboard/StoreQuestion", (req, res) => {
  for (let i = 0; i < ques; i++) {
    if (i == 0) {
      question_text = [];
      option_text = [];
    }
    eval("question_text.push(req.body.ques" + i + ")");
    let arr = [];

    for (let j = 0; j < opt[i]; j++) {
      eval("arr.push(req.body.ques" + i + "opt" + j + ")");
    }
    option_text.push(arr);
  }
  // console.log(question_text);
  // console.log(option_text);
  // console.log(option_type);
  // console.log(req.user);
  linkGenerator(req);
  res.redirect("/dashboard");
});

module.exports = router;

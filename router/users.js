const router = require("express").Router();
const { userRegister } = require("../utils/Auth");

//================reginstration===========//
//@endUser registration
router.post("/register-endUser", async (req, res) => {
  await userRegister(req.body, "endUser", res);
});

//@admin registration
router.post("/register-admin", async (req, res) => {
  await userRegister(req.body, "admin", res);
});

//@root Admin registration
router.post("/register-rootAdmin", async (req, res) => {
  await userRegister(req.body, "rootAdmin", res);
});

//=========login==============//
//@endUser login
router.post("/login-endUser", async (req, res) => {});

//@admin login
router.post("/login-admin", async (req, res) => {});

//@root Admin login
router.post("/login-rootAdmin", async (req, res) => {});

//==========protected==================//
//@endUser protected
router.post("/protected-endUser", async (req, res) => {});

//@admin protected
router.post("/protected-admin", async (req, res) => {});

//@root Admin protected
router.post("/protected-rootAdmin", async (req, res) => {});

//===============Common profile route=============//
router.get("profile", async (req, res) => {});
module.exports = router;

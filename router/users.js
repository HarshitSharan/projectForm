const router = require("express").Router();
const {
  userRegister,
  userLogin,
  userAuth,
  serializeUser,
  checkRole,
} = require("../utils/Auth");

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
router.post("/login-endUser", async (req, res) => {
  await userLogin(req.body, "endUser", res);
});

//@admin login
router.post("/login-admin", async (req, res) => {
  await userLogin(req.body, "admin", res);
});

//@root Admin login
router.post("/login-rootAdmin", async (req, res) => {
  await userLogin(req.body, "rootAdmin", res);
});

//==========protected==================//
//@endUser protected
router.get(
  "/protected-endUser",
  userAuth,
  checkRole(["endUser"]),
  async (req, res) => {
    return res.json("Hello endUser");
  }
);

//@admin protected
router.get(
  "/protected-admin",
  userAuth,
  checkRole(["admin"]),
  async (req, res) => {
    return res.json("Hello admin");
  }
);

//@root Admin protected
router.get(
  "/protected-rootAdmin",
  userAuth,
  checkRole(["rootAdmin"]),
  async (req, res) => {
    return res.json("Hello rootAdmin");
  }
);

//===============Common profile route=============//
router.get("/profile", userAuth, async (req, res) => {
  console.log(req.user);
  return res.json(serializeUser(req.user));
});
module.exports = router;

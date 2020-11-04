const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
//Load config
dotenv.config({ path: "./config/config.env" });
//Connecting to DATABASE
connectDB();
const app = express();

//middleWares
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());

require("./middleware/passport")(passport);

//User router middleWare
app.use("/api/users", require("./router/users"));

//Connecting the APP
const PORT = process.env.PORT || 3000;
app.listen(
  PORT,
  console.log(`Server Listening in ${process.env.NODE_ENV} on port ${PORT}`)
);

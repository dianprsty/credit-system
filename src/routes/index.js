var express = require("express");
var router = express.Router();
const AuthRoute = require("./AuthRoute");

router.use("/auth", AuthRoute);

module.exports = router;

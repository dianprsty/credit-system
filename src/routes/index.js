var express = require("express");
var router = express.Router();
const AuthRoute = require("./AuthRoute");
const LoanRoute = require("./LoanRoute");
const CustomerRoute = require("./CustomerRoute");
const VehicleRoute = require("./VehicleRoute");
const LoanStatusRoute = require("./LoanStatusRoute");

router.use("/auth", AuthRoute);
router.use(LoanRoute);
router.use(CustomerRoute);
router.use(VehicleRoute);
router.use(LoanStatusRoute);

module.exports = router;

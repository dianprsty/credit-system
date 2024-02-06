var express = require("express");
var router = express.Router();
const AuthController = require("../controllers/AuthController.js");

router.get("/users", AuthController.index);
router.get("/users/:username", AuthController.show);
router.post("/users/create", AuthController.create);

module.exports = router;

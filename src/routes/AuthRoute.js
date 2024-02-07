var express = require("express");
var router = express.Router();
const AuthController = require("../controllers/AuthController.js");
const AuthMiddleware = require("../middleware/AuthMiddleware.js");

router.get(
  "/users",
  AuthMiddleware.validateToken,
  AuthMiddleware.verifyAdmin,
  AuthController.index
);
router.get(
  "/users/:username",
  AuthMiddleware.validateToken,
  AuthMiddleware.verifyAdmin,
  AuthController.show
);
router.post(
  "/users/create",
  AuthMiddleware.validateToken,
  AuthMiddleware.verifyAdmin,
  AuthController.create
);
router.post("/login", AuthController.login);
router.post("/logout", AuthMiddleware.validateToken, AuthController.logout);

module.exports = router;

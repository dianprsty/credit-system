var express = require("express");
const LoanController = require("../controllers/LoanController");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const FileMiddleware = require("../middleware/FileMiddleware");
var router = express.Router();

router.post(
  "/loans",
  AuthMiddleware.validateToken,
  AuthMiddleware.verifyMarketing,
  FileMiddleware.getFiles,
  LoanController.store
);

module.exports = router;

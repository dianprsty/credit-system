var express = require("express");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const LoanStatusController = require("../controllers/LoanStatusController");
var router = express.Router();

router.post(
  "/loan-status",
  AuthMiddleware.validateToken,
  LoanStatusController.create
);

router.get(
  "/loan-status",
  AuthMiddleware.validateToken,
  LoanStatusController.index
);

router.get(
  "/loan-status/:id",
  AuthMiddleware.validateToken,
  LoanStatusController.show
);

router.put(
  "/loan-status/:id",
  AuthMiddleware.validateToken,
  LoanStatusController.update
);

router.delete(
  "/loan-status/:id",
  AuthMiddleware.validateToken,
  LoanStatusController.delete
);

module.exports = router;

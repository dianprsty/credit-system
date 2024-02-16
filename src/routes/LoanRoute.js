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

router.get("/loans", AuthMiddleware.validateToken, LoanController.index);
router.get("/loans/:id", AuthMiddleware.validateToken, LoanController.show);
router.post(
  "/loans/approval",
  AuthMiddleware.validateToken,
  AuthMiddleware.verifyManager,
  LoanController.approval
);
router.get(
  "/loans/pdf/:id",
  AuthMiddleware.validateToken,
  AuthMiddleware.verifyAdmin,
  LoanController.generatePdf
);
router.post(
  "/loans/upload-pdf",
  AuthMiddleware.validateToken,
  FileMiddleware.getFiles,
  LoanController.uploadPdf
);

module.exports = router;

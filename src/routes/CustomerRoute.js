var express = require("express");
const CustomerController = require("../controllers/CustomerController");
const AuthMiddleware = require("../middleware/AuthMiddleware");
var router = express.Router();

router.post(
  "/customers",
  AuthMiddleware.validateToken,
  CustomerController.create
);

router.get(
  "/customers",
  AuthMiddleware.validateToken,
  CustomerController.index
);

router.get(
  "/customers/:id",
  AuthMiddleware.validateToken,
  CustomerController.show
);

router.put(
  "/customers/:id",
  AuthMiddleware.validateToken,
  CustomerController.update
);

router.delete(
  "/customers/:id",
  AuthMiddleware.validateToken,
  CustomerController.delete
);

module.exports = router;

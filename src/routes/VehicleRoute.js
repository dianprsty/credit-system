var express = require("express");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const VehicleController = require("../controllers/VehicleController");
var router = express.Router();

router.post(
  "/vehicles",
  AuthMiddleware.validateToken,
  VehicleController.create
);

router.get("/vehicles", AuthMiddleware.validateToken, VehicleController.index);

router.get(
  "/vehicles/:id",
  AuthMiddleware.validateToken,
  VehicleController.show
);

router.put(
  "/vehicles/:id",
  AuthMiddleware.validateToken,
  VehicleController.update
);

router.delete(
  "/vehicles/:id",
  AuthMiddleware.validateToken,
  VehicleController.delete
);

module.exports = router;

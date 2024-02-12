const { ulid } = require("ulid");
const VehicleModel = require("../models/VehicleModel");

class VehicleController {
  static async create(req, res, next) {
    try {
      let vehicle = req.body;
      const id = ulid();
      vehicle = { id, ...vehicle };

      const result = await VehicleModel.create(vehicle);

      res.status(201).json({
        success: true,
        status: 200,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async index(req, res, next) {
    try {
      const vehicles = await VehicleModel.index();
      res.status(200).json({
        success: true,
        status: 200,
        data: vehicles,
      });
    } catch (error) {
      next(error);
    }
  }

  static async show(req, res, next) {
    try {
      const id = req.params.id;
      const vehicle = await VehicleModel.show(id);
      res.status(200).json({
        success: true,
        status: 200,
        data: vehicle,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const id = req.params.id;
      let vehicle = req.body;
      vehicle.id = id;
      const result = await VehicleModel.update(vehicle);
      res.status(200).json({
        success: true,
        status: 200,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const id = req.params.id;
      console.log("controller", id);
      const vehicle = await VehicleModel.delete(id);
      res.status(200).json({
        success: true,
        status: 200,
        data: vehicle,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = VehicleController;

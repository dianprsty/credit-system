const { ulid } = require("ulid");
const LoanStatusModel = require("../models/LoanStatusModel");

class LoanStatusController {
  static async create(req, res, next) {
    try {
      let status = req.body;

      const result = await LoanStatusModel.create(status);

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
      const statuses = await LoanStatusModel.index();
      res.status(200).json({
        success: true,
        status: 200,
        data: statuses,
      });
    } catch (error) {
      next(error);
    }
  }

  static async show(req, res, next) {
    try {
      const id = Number(req.params.id);
      const status = await LoanStatusModel.show(id);
      res.status(200).json({
        success: true,
        status: 200,
        data: status,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const id = Number(req.params.id);
      let status = req.body;
      status.id = id;
      status.updatedAt = new Date();
      const result = await LoanStatusModel.update(status);
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
      const id = Number(req.params.id);
      console.log("controller", id);
      const status = await LoanStatusModel.delete(id);
      res.status(200).json({
        success: true,
        status: 200,
        data: status,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = LoanStatusController;

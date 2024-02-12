const { ulid } = require("ulid");
const CustomerModel = require("../models/CustomerModel");

class CustomerController {
  static async create(req, res, next) {
    try {
      let customer = req.body;
      const id = ulid();
      customer.birthDate = new Date(customer.birthDate);
      customer = { id, ...customer };
      console.log(customer);
      console.log(customer.birthDate);

      const result = await CustomerModel.create(customer);

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
      const customers = await CustomerModel.index();
      res.status(200).json({
        success: true,
        status: 200,
        data: customers,
      });
    } catch (error) {
      next(error);
    }
  }

  static async show(req, res, next) {
    try {
      const id = req.params.id;
      const customer = await CustomerModel.show(id);
      res.status(200).json({
        success: true,
        status: 200,
        data: customer,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const id = req.params.id;
      let customer = req.body;
      customer.id = id;
      const result = await CustomerModel.update(customer);
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
      const customer = await CustomerModel.delete(id);
      res.status(200).json({
        success: true,
        status: 200,
        data: customer,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CustomerController;

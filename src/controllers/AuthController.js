const bcript = require("bcrypt");
const { ulid } = require("ulid");
const AuthModel = require("../models/AuthModel");

class AuthController {
  static login() {
    //
  }

  static async create(req, res, next) {
    //
    let { username, role, password } = req.body;
    password = await bcript.hash(password, 10);
    role = role.toUpperCase();
    const id = ulid();
    try {
      AuthModel.create(id, username, role, password);
      res.status(201).json({
        message: "created",
        status: 201,
        data: {
          username: username,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async index(req, res, next) {
    try {
      const users = await AuthModel.index();
      res.status(200).json({
        message: "success",
        status: 200,
        data: users,
      });
    } catch (error) {
      next(error);
    }
  }

  static async show(req, res, next) {
    const username = req.params.username;
    try {
      const user = await AuthModel.show(username);
      res.status(200).json({
        message: "success",
        status: 200,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;

const bcript = require("bcrypt");
const { ulid } = require("ulid");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const AuthModel = require("../models/AuthModel");

dotenv.config();

class AuthController {
  static async create(req, res, next) {
    //
    let { username, name, role, password } = req.body;
    password = await bcript.hash(password, 10);
    role = role.toUpperCase();
    const id = ulid();
    try {
      let user = await AuthModel.create(id, username, name, role, password);
      res.status(201).json({
        message: "created",
        status: 201,
        data: {
          username: {
            id: user.id,
            username: user.username,
            name: user.name,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async index(req, res, next) {
    try {
      const users = await AuthModel.index();
      const usersWithoutPassword = users.map((item) => {
        return {
          id: item.id,
          username: item.username,
          role: item.role,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        };
      });
      res.status(200).json({
        message: "success",
        status: 200,
        data: usersWithoutPassword,
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
        data: {
          id: user.id,
          username: user.username,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    const { username, password } = req.body;

    try {
      if (!username || !password) throw Error("username or password are null");
      let user = await AuthModel.show(username);
      let isMatch = await bcript.compare(password, user.password);
      if (isMatch) {
        const token = jwt.sign(
          { sub: { id: user.id, username: user.username } },
          process.env.JWT_SECRET,
          {
            expiresIn: "2d",
          }
        );
        res.status(200).json({
          message: "success",
          status: 200,
          data: {
            token: token,
          },
        });
      }
    } catch (error) {
      next(error);
    }
  }

  static async logout(req, res, next) {
    try {
      const header = req.headers.authorization;
      const token = header.split(" ")[1];
      await AuthModel.insertToken(token);
      res.status(200).json({
        success: true,
        status: 200,
        message: "logout success",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;

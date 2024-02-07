const jwt = require("jsonwebtoken");
const AuthModel = require("../models/AuthModel");
require("dotenv").config();

class AuthMiddleware {
  static async validateToken(req, res, next) {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader.split(" ")[1];

      const isBlacklisted = await AuthModel.isTokenBlackListed(token);

      let payload = jwt.verify(token, process.env.JWT_SECRET, {
        complete: false,
      });

      if (isBlacklisted) {
        res.status(401).json({
          succes: false,
          status: 401,
          message: "invalid token",
        });
        return;
      }
      if (payload) {
        req.payload = payload.sub;
        next();
      }
    } catch (error) {
      res.status(401).json({
        succes: false,
        status: 401,
        message: "invalid token payload",
      });
    }
  }

  static async verifyAdmin(req, res, next) {
    let { id, username } = req.payload;

    try {
      const user = await AuthModel.show(username);

      if (user) {
        if (user.id != id || user.role != "ADMIN") {
          throw Error("not allowed");
        }
        next();
      }
    } catch (error) {
      res.status(403).json({
        succes: false,
        status: 403,
        message: "not allowed",
      });
    }
  }

  static async verifyMarketing(req, res, next) {
    let { id, username } = req.payload;

    try {
      const user = await AuthModel.show(username);

      if (user) {
        if (user.id != id || user.role != "MARKETING") {
          throw Error("not allowed");
        }
        next();
      }
    } catch (error) {
      res.status(403).json({
        succes: false,
        status: 403,
        message: "not allowed",
      });
    }
  }

  static async verifyManager(req, res, next) {
    let { id, username } = req.payload;

    try {
      const user = await AuthModel.show(username);

      if (user) {
        if (user.id != id || user.role != "MANAGER") {
          throw Error("not allowed");
        }
        next();
      }
    } catch (error) {
      res.status(403).json({
        succes: false,
        status: 403,
        message: "not allowed",
      });
    }
  }
}

module.exports = AuthMiddleware;

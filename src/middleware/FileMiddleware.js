const multer = require("multer");

class FileMiddleware {
  static getFiles = multer().any();
}

module.exports = FileMiddleware;

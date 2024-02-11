const generateImageLink = require("../utils/genetateImageLink");

class LoanController {
  static async store(req, res, next) {
    try {
      console.log(req.files);
      let byte = req.files[0].buffer;
      let mimetype = req.files[0].mimetype;
      res.status(200).json({
        success: true,
        status: 200,
        data: generateImageLink(byte, mimetype),
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = LoanController;

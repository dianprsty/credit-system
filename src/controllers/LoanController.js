const fs = require("fs");
const VehicleModel = require("../models/VehicleModel");
const CustomerModel = require("../models/CustomerModel");
const { default: Decimal } = require("decimal.js");
const { ulid } = require("ulid");
const LoanModel = require("../models/LoanModel");

class LoanController {
  static async store(req, res, next) {
    try {
      const id = ulid();
      const userId = req.payload.id;
      let {
        insurance,
        downPayment,
        duration,
        interest,
        customerId,
        vehicleId,
      } = req.body;

      duration = Number(duration);

      const vehicle = await VehicleModel.show(vehicleId);
      if (!vehicle) throw Error("vehicle data not found");

      const customer = await CustomerModel.show(customerId);
      if (!customer) throw Error("customer data not found");

      const totalInsurance = vehicle.price.times(insurance).dividedBy(100);
      const totalLoan = vehicle.price.minus(downPayment).plus(totalInsurance);
      const totalInterest = totalLoan
        .times(interest)
        .dividedBy(100)
        .times(duration / 12);
      const installments = totalLoan.plus(totalInterest).div(duration);

      const images = {};

      if (!fs.existsSync("public/images/loans")) {
        fs.mkdirSync("public/images/loans");
      }
      fs.mkdirSync(`public/images/loans/${id}`);
      for (const image of req.files) {
        if (image.mimetype.includes("image")) {
          let imagePath = `images/loans/${id}/${image.fieldname}_${image.originalname}`;
          fs.writeFileSync(`public/${imagePath}`, image.buffer);
          images[image.fieldname] = imagePath;
        }
      }

      // Save Image
      const image = await LoanModel.saveImage(images);
      console.log(image);

      const loandata = {
        id,
        insurance,
        downPayment,
        duration,
        interest,
        installments,
        userId,
        customerId,
        vehicleId,
        loanStatusId: 1,
        loanImagesId: image.id,
      };

      console.log(loandata);

      const result = await LoanModel.create(loandata);

      res.status(200).json({
        success: true,
        status: 200,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = LoanController;

const fs = require("fs");
const VehicleModel = require("../models/VehicleModel");
const CustomerModel = require("../models/CustomerModel");
const { ulid } = require("ulid");
const LoanModel = require("../models/LoanModel");
const PuppeteerHTMLPDF = require("puppeteer-html-pdf");
const { handlebars } = require("hbs");

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
      console.log(images);
      const image = await LoanModel.saveImage(images);

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

  static async index(req, res, next) {
    try {
      const loans = await LoanModel.index();
      res.status(200).json({
        success: true,
        status: 200,
        data: loans,
      });
    } catch (error) {
      next(error);
    }
  }

  static async show(req, res, next) {
    try {
      const id = req.params.id;
      const loan = await LoanModel.show(id);
      res.status(200).json({
        success: true,
        status: 200,
        data: loan,
      });
    } catch (error) {
      next(error);
    }
  }

  static async approval(req, res, next) {
    try {
      const { id, isApproved } = req.body;

      const loan = await LoanModel.show(id);

      if (!loan.id) throw Error("loan not found");

      if (loan.loanStatusId != 1) {
        throw Error("loan is already approved / rejected");
      }

      const result = await LoanModel.approval(id, isApproved);

      res.status(200).json({
        success: true,
        status: 200,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async generatePdf(req, res, next) {
    const htmlPDF = new PuppeteerHTMLPDF();
    htmlPDF.setOptions({ format: "A4" });

    try {
      const id = req.params.id;
      const loanData = await LoanModel.show(id);

      loanData.date = new Date().toLocaleString("id-ID");
      loanData.baseUrl = `${req.protocol}://${req.get("host")}`;
      loanData.totalInsurance = loanData.vehicle.price
        .times(loanData.insurance)
        .div(100);

      const birthDate = loanData.customer.birthDate;
      loanData.customer.birthDate = `${
        birthDate.getDate() < 10
          ? "0" + birthDate.getDate()
          : birthDate.getDate()
      }-${
        birthDate.getMonth() < 10
          ? "0" + birthDate.getMonth()
          : birthDate.getMonth()
      }-${birthDate.getFullYear()}`;

      const html = await htmlPDF.readFile("views/loans.hbs", "utf8");
      const template = handlebars.compile(html);
      const content = template(loanData);

      const pdfBuffer = await htmlPDF.create(content);
      res.attachment(`PO_${loanData.customer.name}_${loanData.id}.pdf`);
      res.end(pdfBuffer);
    } catch (error) {
      next(error);
    }
  }

  static async uploadPdf(req, res, next) {
    try {
      const pdf = req.files[0];
      console.log(pdf);

      if (!pdf.mimetype.includes("pdf")) throw Error("file should be pdf");

      res.status(200).json({
        success: true,
        status: 200,
        data: pdf,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = LoanController;

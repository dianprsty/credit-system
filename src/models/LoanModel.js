const prisma = require("../db/prisma");

class LoanModel {
  static async saveImage(images) {
    return await prisma.loanImages.create({ data: images });
  }

  static async create(loan) {
    return await prisma.loan.create({ data: loan });
  }
}

module.exports = LoanModel;

const prisma = require("../db/prisma");

class LoanModel {
  static async saveImage(images) {
    return await prisma.loanImages.create({ data: images });
  }

  static async uploadPdf(pdf) {
    return await prisma.loanPdfSigned.create({ data: pdf });
  }

  static async create(loan) {
    return await prisma.loan.create({ data: loan });
  }

  static async index() {
    return await prisma.loan.findMany({
      relationLoadStrategy: "join",
      include: {
        customer: true,
        vehicle: true,
        loanImages: true,
        loanStatus: true,
        user: {
          select: {
            id: true,
            name: true,
            username: true,
          },
        },
      },
    });
  }

  static async show(id) {
    return await prisma.loan.findUnique({
      where: { id: id },
      relationLoadStrategy: "join",
      include: {
        customer: true,
        vehicle: true,
        loanImages: true,
        loanStatus: true,
        user: {
          select: {
            id: true,
            name: true,
            username: true,
          },
        },
      },
    });
  }

  static async approval(id, isApproved) {
    return await prisma.loan.update({
      where: {
        id: id,
      },
      data: {
        loanStatusId: isApproved ? 3 : 2,
      },
    });
  }

  static async updateStatus(id, status) {
    return await prisma.loan.update({
      where: {
        id: id,
      },
      data: {
        loanStatusId: status,
      },
    });
  }
}

module.exports = LoanModel;

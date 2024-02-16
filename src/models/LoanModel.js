const prisma = require("../db/prisma");

class LoanModel {
  static async saveImage(images) {
    return await prisma.loanImages.create({ data: images });
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
}

module.exports = LoanModel;

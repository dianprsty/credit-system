const prisma = require("../db/prisma");

class LoanStatusModel {
  static async create(loanStatus) {
    return await prisma.loanStatus.create({
      data: loanStatus,
    });
  }
  static async index() {
    return await prisma.loanStatus.findMany();
  }

  static async show(id) {
    return await prisma.loanStatus.findUnique({
      where: {
        id: id,
      },
    });
  }

  static async update(loanStatus) {
    return await prisma.loanStatus.update({
      where: {
        id: loanStatus.id,
      },
      data: loanStatus,
    });
  }

  static async delete(id) {
    return await prisma.loanStatus.delete({
      where: {
        id: id,
      },
    });
  }
}

module.exports = LoanStatusModel;

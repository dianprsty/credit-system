const prisma = require("../db/prisma");

class CustomerModel {
  static async create(customer) {
    return await prisma.customer.create({
      data: customer,
    });
  }
  static async index() {
    return await prisma.customer.findMany();
  }

  static async show(id) {
    // return await prisma.customer.findMany();

    try {
      return await prisma.customer.findUnique({
        where: {
          id: id,
        },
      });
      return data;
    } catch (error) {
      return error;
    }
  }
  static async update(customer) {
    return await prisma.customer.update({
      where: {
        id: customer.id,
      },
      data: customer,
    });
  }
  static async delete(id) {
    return await prisma.customer.delete({
      where: {
        id: id,
      },
    });
  }
}

module.exports = CustomerModel;

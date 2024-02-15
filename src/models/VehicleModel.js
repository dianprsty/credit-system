const prisma = require("../db/prisma");

class VehicleModel {
  static async create(vehicle) {
    return await prisma.vehicle.create({
      data: vehicle,
    });
  }
  static async index() {
    return await prisma.vehicle.findMany();
  }

  static async show(id) {
    return await prisma.vehicle.findUnique({
      where: {
        id: id,
      },
    });
  }

  static async update(vehicle) {
    return await prisma.vehicle.update({
      where: {
        id: vehicle.id,
      },
      data: vehicle,
    });
  }

  static async delete(id) {
    return await prisma.vehicle.delete({
      where: {
        id: id,
      },
    });
  }
}

module.exports = VehicleModel;

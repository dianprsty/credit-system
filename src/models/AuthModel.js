const prisma = require("../db/prisma");

class AuthModel {
  //
  static async create(id, username, role, password) {
    await prisma.user.create({
      data: {
        id: id,
        username: username,
        role: role,
        password: password,
      },
    });
  }

  static async index() {
    return await prisma.user.findMany();
  }

  static async show(username) {
    return await prisma.user.findFirst({
      where: {
        username: username,
      },
    });
  }
}

module.exports = AuthModel;

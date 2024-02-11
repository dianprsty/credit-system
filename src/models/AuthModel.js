const prisma = require("../db/prisma");

class AuthModel {
  //
  static async create(id, username, name, role, password) {
    return await prisma.user.create({
      data: {
        id: id,
        username: username,
        name: name,
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

  static async insertToken(token) {
    let query = `INSER INTO TokenBlacklist VALUES(${token})`;
    //
    await prisma.tokenBlacklist.create({
      data: {
        token: token,
      },
    });
  }

  static async isTokenBlackListed(token) {
    let data = await prisma.tokenBlacklist.findFirst({
      where: {
        token: token,
      },
    });
    console.log(data);

    return !!data;
  }
}

module.exports = AuthModel;

const { User } = require('../models/models');

class UserController {
  async getAll(req, res) {
    const users = await User.findAll();
    return res.status(200).json(users);
  }

  async getOne(req, res) {
    const { name } = req.params;
    const user = await User.findOne({ where: { name } });
    return res.status(200).json(user);
  }

  async create(req, res) {
    const { name } = req.body;
    const user = await User.findOrCreate({ where: { name } });
    return res.status(200).json(user[0]);
  }
}

module.exports = new UserController();

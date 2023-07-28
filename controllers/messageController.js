const { Message, User } = require('../models/models');

class MessageController {
  async create(reqBody) {
    const { theme, text, recipient, userId } = reqBody;
    const message = await Message.create({ theme, text, recipient, userId });
    const result = await Message.findOne({
      where: { id: message.id },
      include: User,
    });
    return result;
  }

  async getAll(req, res) {
    const { user } = req.params;
    const messages = await Message.findAll({
      where: { recipient: user },
      include: User,
      order: [['id', 'DESC']],
    });
    return res.status(200).json(messages);
  }
}

module.exports = new MessageController();

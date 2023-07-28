const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
});

const Message = sequelize.define('message', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  theme: { type: DataTypes.STRING, allowNull: false },
  text: { type: DataTypes.TEXT, allowNull: false },
  recipient: { type: DataTypes.STRING, allowNull: false },
});

User.hasMany(Message);
Message.belongsTo(User);

module.exports = { User, Message };

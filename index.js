require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http').Server(app);
const cors = require('cors');
const io = require('socket.io')(http, {
  cors: {
    origin: process.env.FRONTEND_URL,
  },
});
const router = require('./routes/index');
const messageController = require('./controllers/messageController');
const sequelize = require('./db');

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

io.on('connection', (socket) => {
  console.log(`${socket.id} user just connected!`);

  socket.on('disconnect', () => {
    console.log(`${socket.id}user disconnected`);
  });
});

app.use('/', router);
app.post('/message/create', async (req, res) => {
  const message = await messageController.create(req.body);
  io.emit('new-message', { message });
  res.status(200).json(message);
});
app.get('/message/all/:user', messageController.getAll);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    http.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();

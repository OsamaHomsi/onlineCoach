const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('New client connected');

  // User creates a group
  socket.on('createGroup', (groupId) => {
    socket.join(groupId);
    console.log(
      `Group ${groupId} created and user joined`
    );
  });

  // User joins a group
  socket.on('joinGroup', (groupId) => {
    socket.join(groupId);
    console.log(`User joined group ${groupId}`);
  });

  // User sends a message
  socket.on('sendMessage', (groupId, message) => {
    io.to(groupId).emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(3000, () =>
  console.log('Server running on port 3000')
);

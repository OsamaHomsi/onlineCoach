const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware to serve static files
app.use(express.static('public'));

// Root endpoint
app.get('/g', (req, res) => {
  res.sendFile(
    path.join(__dirname, public, 'index.html')
  );
});

// Socket.IO connection
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
  socket.on('sendMessage', (data) => {
    const { groupId, message } = data;
    io.to(groupId).emit('message', message);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start server on port 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

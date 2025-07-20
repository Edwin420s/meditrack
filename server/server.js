require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const socketio = require('socket.io');
const http = require('http');

// Connect to database
connectDB();

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(express.json());
app.use(cors());

// Socket.io
io.on('connection', (socket) => {
  console.log('New client connected');
  
  socket.on('new_appointment', (appointment) => {
    io.emit('appointment_update', appointment);
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/appointments', require('./routes/appointments'));

// Inject io into request object
app.use((req, res, next) => {
  req.io = io;
  next();
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
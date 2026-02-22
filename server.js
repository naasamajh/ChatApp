require('dotenv').config();
const express = require('express');
const http = require('http');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const setupChatSocket = require('./src/server/socket/chatSocket');
const adminRoutes = require('./src/server/routes/adminRoutes');
const Admin = require('./src/server/models/Admin');

const app = express();
const server = http.createServer(app);

const isProduction = process.env.NODE_ENV === 'production';

// Socket.IO setup
const io = new Server(server, {
  cors: isProduction ? {} : {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

app.set('io', io);

// Middleware
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));

if (!isProduction) {
  app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }));
}

app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { success: false, message: 'Too many requests' }
});
app.use('/api/', limiter);

// Admin login route (before protected routes)
app.post('/api/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const jwt = require('jsonwebtoken');
    const token = jwt.sign(
      { id: admin._id, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(200).json({ success: true, token, admin: { id: admin._id, email: admin.email } });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Protected admin routes
app.use('/api/admin', adminRoutes);

// Name generation endpoint
app.get('/api/generate-name', (req, res) => {
  const { generateUsername } = require('./src/server/utils/nameGenerator');
  res.json({ success: true, username: generateUsername() });
});

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'IncogniChat API is running!' });
});

// Serve static files in production
if (isProduction) {
  app.use(express.static(path.join(__dirname, 'dist')));

  // Handle client-side routing — serve index.html for all non-API routes
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api') && !req.path.startsWith('/socket.io')) {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    }
  });
}

// Connect MongoDB & setup socket
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log(`✅ MongoDB Connected: ${mongoose.connection.host}`);

    // Create default admin
    const existingAdmin = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    if (!existingAdmin) {
      await Admin.create({ email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD });
      console.log('👑 Default admin created');
    }

    // Setup socket
    setupChatSocket(io);
  })
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`\n🚀 IncogniChat Server running on port ${PORT}`);
  console.log(`📡 Socket.IO ready for connections`);
  if (isProduction) {
    console.log(`🌐 Serving React app from /dist`);
  } else {
    console.log(`🌐 Dev mode — frontend at http://localhost:5173\n`);
  }
});

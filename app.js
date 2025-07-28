// Load environment variables FIRST
require('dotenv').config();

// Debug: Check if .env is loading
console.log('MONGODB_URI exists?', !!process.env.MONGODB_URI)
console.log('PORT exists?', !!process.env.PORT)

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/', require('./routes/urlRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

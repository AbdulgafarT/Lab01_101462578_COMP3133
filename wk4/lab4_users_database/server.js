require('dotenv').config();  // Load environment variables

const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());  // Middleware to parse JSON

// 🔥 Debugging: Check if MONGO_URI is loaded
console.log("MONGO_URI:", process.env.MONGO_URI);

if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is not defined. Check your .env file.");
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected..."))
  .catch(err => console.log("❌ MongoDB Connection Error:", err));

// Import and Use Routes
const userRoutes = require('./routes/users');  // ✅ Ensure this file exists
app.use('/users', userRoutes);

// Start Server
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

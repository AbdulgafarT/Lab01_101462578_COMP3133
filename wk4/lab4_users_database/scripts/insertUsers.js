// Load environment variables
require('dotenv').config();

// Import dependencies
const mongoose = require('mongoose');
const User = require('../models/User');
const usersData = require('./usersData.json');

// Check if MONGO_URI is loaded correctly
console.log("MONGO_URI:", process.env.MONGO_URI);

if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is not defined. Check your .env file.");
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log("✅ Connected to MongoDB");

  await User.insertMany(usersData);
  console.log("✅ Users added successfully");

  mongoose.connection.close();
}).catch(err => console.log("❌ MongoDB Connection Error:", err));

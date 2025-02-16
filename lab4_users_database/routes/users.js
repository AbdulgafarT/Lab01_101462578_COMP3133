const express = require('express');
const User = require('../models/User'); // Ensure the User model exists
const router = express.Router();

// Create a new user (Prevent Duplicate Emails)
router.post('/', async (req, res) => {
  try {
    console.log("Received POST request:", req.body); // Debugging

    // Check if the email already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ error: "❌ Email already exists. Use a different email." });
    }

    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: "✅ User created successfully", user: newUser });

  } catch (err) {
    console.error("❌ Error saving user:", err);
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;

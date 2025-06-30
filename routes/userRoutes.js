const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/submit', async (req, res) => {
  console.log("Received:", req.body); // Debugging
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: '✅ Data saved successfully' });
  } catch (error) {
    res.status(400).json({ error: '❌ Failed to save data', details: error });
  }
});

module.exports = router;
// GET all users
router.get('/all', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

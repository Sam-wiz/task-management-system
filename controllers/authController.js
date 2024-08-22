const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { createUser, findUserByUsername } = require('../models/User');
require('dotenv').config();



const register = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const user = await createUser(username, password, role);
    res.status(201).json(user);
  } catch (error) {
    if (error.message === 'Username already exists') {
      res.status(409).json({ message: 'Username already exists' });
    } else {
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  }
};


const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await findUserByUsername(username);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};


module.exports = { register, login };
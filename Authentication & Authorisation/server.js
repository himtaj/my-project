const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// In-memory user storage (for demo purposes)
const users = [];

// Secret key for JWT
const secretKey = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNzU5OTg1NTYyLCJleHAiOjE3NTk5ODkxNjJ9.kHoXftuPVCy8DFEsxPfg6y1QSeVRQDQ5qJ8MKqLjgrw';

// ------------------- REGISTER -------------------
app.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password || !role) {
    return res.status(400).send('All fields are required');
  }
  
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword, role });
  res.status(201).send('User registered successfully');
});

// ------------------- LOGIN -------------------
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(400).send('Invalid username or password');

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send('Invalid username or password');

  const token = jwt.sign({ username: user.username, role: user.role }, secretKey, { expiresIn: '1h' });
  res.status(200).json({ token });
});

// ------------------- JWT AUTH MIDDLEWARE -------------------
const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).send('Access Denied');

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(400).send('Invalid Token');
  }
};

// ------------------- ROLE-BASED AUTH -------------------
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).send('Access Denied');
    }
    next();
  };
};

// ------------------- PROTECTED ROUTES -------------------
app.get('/admin', authenticateJWT, authorizeRoles('Admin'), (req, res) => {
  res.status(200).send('Welcome Admin');
});

app.get('/user', authenticateJWT, authorizeRoles('User', 'Admin'), (req, res) => {
  res.status(200).send(`Welcome ${req.user.username}`);
});

// ------------------- START SERVER -------------------
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
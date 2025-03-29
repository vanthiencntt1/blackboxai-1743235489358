const express = require('express');
const AuthController = require('./auth.controller');
const router = express.Router();
const authController = new AuthController();

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = authController.login(username, password);
  
  if (user) {
    req.session.user = user;
    res.json({ success: true, user });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

router.post('/logout', (req, res) => {
  authController.logout(req.session);
  res.json({ success: true });
});

router.get('/check', (req, res) => {
  if (req.session.user) {
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    res.json({ loggedIn: false });
  }
});

module.exports = router;

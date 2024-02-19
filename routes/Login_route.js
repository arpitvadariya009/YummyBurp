const express = require('express');
const router = express.Router();
const path = require('path');


// Include the Google authentication route in your login route
router.get('/login', (req, res) => {
    res.render(path.join(__dirname, '..', 'login.ejs'));
  });
  // ...
  
  // Update the check for authentication in your dashboard route
  router.get('/dashboard', (req, res) => {
    if (req.isAuthenticated()) {
      res.render(path.join(__dirname, '..', 'dashboard.ejs'), { user: req.user });
    } else {
      res.redirect('/login');
    }
  });

router.get('/logout', (req, res) => {
    req.logout(); // Passport.js function to logout
    res.redirect('/login');
  });

module.exports = router;

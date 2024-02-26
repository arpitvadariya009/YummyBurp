const express = require('express');
const Router = express.Router();
const passportConfig = require('../middleware/passportConflig');
const passport = require('passport');
const path = require('path')


// Router.get(
//     '/auth/google',
//     passport.authenticate('google', { scope: ['profile', 'email'] })
//   );

// Router.get(
//     '/auth/google/callback',
//     passport.authenticate('google', {
//       failureRedirect: '/login',
//     }),
//     (req, res) => {
//       res.redirect('/dashboard');
//     }
// );

// Router.get('/login/success', (req, res) => {
//     if (req.isAuthenticated()) {
//       res.status(200).json({ message: 'User Login', user: req.user });
//     } else {
//       res.status(400).json({ message: 'Not Authorized' });
//     }
// });

// // Include the Google authentication route in your login route
// Router.get('/login', (req, res) => {
//     res.render(path.join(__dirname, '..', 'login.ejs'));
// });

// // Update the check for authentication in your dashboard route
// Router.get('/dashboard', (req, res) => {
//     if (req.isAuthenticated()) {
//       res.render(path.join(__dirname, '..', 'dashboard.ejs'), { user: req.user });
//     } else {
//       res.redirect('/login');
//     }
// });

// Router.get('/logout', (req, res) => {
//     req.logout((err) => {
//       if (err) {
//         console.error('Error during logout:', err);
//         return res.status(500).json({ message: 'Internal Server Error' });
//       }
//       res.redirect('/login');
//     });
// });


const {
  userRegister,
  verifyOTPAndRegister,
  forgetPassword,
  resetPassword
}=require('../userController/loginController')


Router.post('/register-with-otp',userRegister)
Router.post('/verify-otp-and-register',verifyOTPAndRegister)
Router.post('/forgetPassword-with-otp',forgetPassword)
Router.post('/resetPassword-with-otp',resetPassword)






module.exports = Router;

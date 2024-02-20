// const express  = require('express')
// const app =  express()
// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const userdb = require("../models/UserLogin");
// passport.use(
//     new GoogleStrategy(
//         {
//             clientID: process.env.CLIENT_ID,
//             clientSecret: process.env.CLIENT_SECRET,
//             callbackURL: "/auth/google/callback",
//             scope: ["profile", "email"]
//         },
//         async (accessToken, refreshToken, profile, done) => {
//             try {
//                 let user = await userdb.findOne({ googleId: profile.id });
//                 if (!user) {
//                     user = new userdb({
//                         googleId: profile.id,
//                         displayName: profile.displayName,
//                         email: profile.emails[0].value,
//                         Image: profile.photos[0].value
//                     })

//                     await user.save();
//                 }

//                 return done(error, null);
//             } catch (error) {

//                 return done(error, null);
//             }
//         }
//     )
// );

// passport.serializeUser((user, done) => {
//     return done(null, user);
//   });

// passport.deserializeUser((user, done) => {
//     return done(null, user);
//   });



// app.get("/auth/google",passport.authenticate("google",{scope:["profile","email"]}));

// app.get("/auth/google/callback",passport.authenticate("google",{
//     successRedirect:"http://localhost:9000/dashboard",
//     failureRedirect:"http://localhost:9000/login"
// }))

// app.get("/login/sucess",async(req,res)=>{

//     if(req.user){
//         res.status(200).json({message:"user Login",user:req.user})
//     }else{
//         res.status(400).json({message:"Not Authorized"})
//     }
// })

const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const userdb = require('../models/UserLogin');
const path = require('path')
const { TokenError } = require('passport-oauth2');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: 'http://localhost:9000/auth/google/callback',
      scope: ['profile', 'email'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await userdb.findOne({ googleId: profile.id }).maxTimeMS(20000);;
        if (!user) {
          user = new userdb({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value,
            Image: profile.photos[0].value,
          });

          await user.save();
        }

        return done(null, user);
      } catch (error) {
        if (error instanceof TokenError) {
          // Handle TokenError specifically
          console.error('TokenError:', error.message);
        } else {
          // Handle other errors
          console.error('Other error:', error.message);
        }
        return done(error, null);
      }
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userdb.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

const router = express.Router();

// Update the Google authentication route in your router
router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
  }),
  (req, res) => {
    res.redirect('/dashboard');
  }
);

router.get('/login/success', (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ message: 'User Login', user: req.user });
  } else {
    res.status(400).json({ message: 'Not Authorized' });
  }
});

// Include the Google authentication route in your login route
router.get('/login', (req, res) => {
  res.render(path.join(__dirname, '..', 'login.ejs'));
});

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
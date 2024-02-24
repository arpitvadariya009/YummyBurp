const U_login = require('../models/U_loginModel');
const twilio = require('twilio');
const crypto = require('crypto');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = twilio(accountSid, authToken);


const generateRandomOTP = () => {
    const otp = crypto.randomInt(10000);
    return otp.toString()
  };
  


exports.userRegister = async (req, res) => {
    try {
        console.log("Request Body:", req.body);

        const { phonenumber } = req.body;

        if (!phonenumber || typeof phonenumber !== 'string') {
            return res.status(400).json({ error: 'Invalid phone number' });
        }

        const existingUser = await U_login.findOne({ phonenumber });

        console.log("existingUser", existingUser);

        if (existingUser) {
            return res.status(400).json({ error: 'User already registered' });
        }

        const newUser = new U_login({ phonenumber });

         const generatedOTP = generateRandomOTP();
        const expirationTime = new Date();

        newUser.otp = generatedOTP;
        newUser.otpExpiration = expirationTime;

        console.log("Generated OTP:", generatedOTP);
        console.log("OTP Expiration:", expirationTime);

        try {
            await twilioClient.messages.create({
                body: `Your OTP for verification is: ${generatedOTP}`,
                to: phonenumber,
                from: process.env.TWILIO_NUMBER
            });
            console.log(`OTP sent to ${phonenumber} via Twilio`);
        } catch (twilioError) {
            console.error('Twilio error:', twilioError);
            return res.status(500).json({ error: 'Failed to send OTP via Twilio' });
        }

        await newUser.save();

        res.json({ message: 'OTP sent successfully. Please verify OTP to complete registration.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

exports.verifyOTPAndRegister = async (req, res) => {
    try {
        const { phonenumber, enteredOTP } = req.body;

        console.log("body",req.body);

        const user = await U_login.findOne({ phonenumber });

        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        if (user.otp !== enteredOTP || new Date() > user.otpExpiration) {
            return res.status(400).json({ error: 'Invalid or expired OTP' });
        }

        user.isRegistered = true; 
        await user.save();

        res.json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

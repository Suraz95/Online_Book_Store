const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const crypto = require('crypto');
const { Vonage } = require('@vonage/server-sdk');

const app = express();
app.use(express.json());
app.use(cors());

const db = "mongodb+srv://shaiksuraz50:8Zhg3S9vanvvSlOE@cluster0.tre1ikc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(db)
  .then(() => {
    console.log("Connection to MongoDB successful");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });

const vonage = new Vonage({
  apiKey: "ac7c8133",
  apiSecret: "xXIP87ov73Y7Uo6M"
});

// In-memory store for OTPs (consider using a database for production)
const otpStore = {};

// Generate OTP
const generateOtp = () => {
  return crypto.randomInt(100000, 999999).toString();
};

// Function to send OTP via Vonage
const sendOtpViaVonage = async (phone, otp) => {
  const from = "Vonage APIs";
  const text = `Your verification code is ${otp}`;

  console.log(`Sending OTP to ${phone}`);
  try {
    const response = await vonage.sms.send({ to: phone, from, text });
    console.log('Message sent successfully', response);
    return response;
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw error;
  }
};

// Endpoint to send OTP
app.post("/send-otp", async (req, res) => {
  const { phone } = req.body;
  console.log(`Received request to send OTP to ${phone}`);

  const otp = generateOtp();
  otpStore[phone] = otp; // Store OTP in memory (consider expiration time)

  try {
    const response = await sendOtpViaVonage(phone, otp);
    console.log("OTP sent successfully:", response);
    res.json({ message: "OTP sent successfully", response });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ error: "Failed to send OTP" });
  }
});

// Endpoint to verify OTP
app.post("/verify-otp", async (req, res) => {
  const { phone, inputOtp } = req.body;
  console.log(`Received request to verify OTP for ${phone}`);

  try {
    if (otpStore[phone] === inputOtp) {
      console.log("Phone number verified successfully");
      delete otpStore[phone]; // Clear OTP after verification
      res.json({ message: "Phone number verified successfully" });
    } else {
      console.log("Invalid OTP");
      res.status(400).json({ error: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ error: "Failed to verify OTP" });
  }
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  Customer.findOne({ email })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          res.json("success");
        } else {
          res.json("The password is incorrect");
        }
      } else {
        res.json("No user exists");
      }
    })
    .catch((err) => {
      console.log("Error finding user:", err);
      res.status(500).json({ error: "Could not find user" });
    });
});

app.post("/signup", (req, res) => {
  const { name, phone, username, email, password } = req.body;
  Customer.findOne({ $or: [{ email }, { phone }, { username }] })
    .then((existingCustomer) => {
      if (existingCustomer) {
        res.status(400).json({ error: "Email, phone number or username already exists" });
      } else {
        const newCustomer = new Customer({ name, phone, username, email, password });
        newCustomer.save()
          .then((customer) => {
            res.status(201).json({ message: "Successfully registered", customer });
          })
          .catch((err) => { 
            console.log("Error creating customer:", err);
            res.status(500).json({ error: "Could not create customer" });
          });
      }
    })
    .catch((err) => {
      console.log("Error finding customer:", err);
      res.status(500).json({ error: "Could not check existing customer" });
    });
});

app.listen(8000, () => {
  console.log("Server started on port 8000");
});

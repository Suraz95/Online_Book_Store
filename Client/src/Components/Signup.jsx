import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from "emailjs-com";
import signupbg from "../assets/signup/signupbg.jpg"
const Signup = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [inputOtp, setInputOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [buttonLabel, setButtonLabel] = useState("Generate OTP");
  const [showModal, setShowModal] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  const checkPasswordStrength = (password) => {
    const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return regex.test(password);
  };

  const calculatePasswordStrength = (password) => {
    const strength =
      password.length >= 8 ? (checkPasswordStrength(password) ? 100 : 50) : 0;
    return strength;
  };

  const getPasswordStrengthText = (strength) => {
    if (strength === 0) return "Weak";
    if (strength < 50) return "Normal";
    if (strength < 100) return "Strong";
    return "Very Strong";
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordStrength(
      getPasswordStrengthText(calculatePasswordStrength(value))
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (phone.length < 10) {
      setError("Please enter a valid phone number.");
      return;
    }

    if (!checkPasswordStrength(password)) {
      setError(
        "Password should contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }
    axios
      .post("http://localhost:8000/signup", {
        name,
        phone,
        username,
        email,
        password,
      })
      .then((result) => {
        toast.success("Successfully registered!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to create account. Please try again.");
      });
  };

  const generateOtp = () => {
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setOtp(otp);
    emailjs
      .send(
        "service_4r3dsji",
        "template_dy8wlmg",
        {
          to_email: email,
          otp: otp,
        },
        "rSEiZFxLVOldQncdA"
      )
      .then((response) => {
        console.log("Email sent successfully:", response.status, response.text);
        toast.success("OTP sent to your email.");
        setButtonLabel("Resend OTP");
        setShowModal(true);
      })
      .catch((error) => {
        console.error("Failed to send email:", error);
        toast.error("Failed to send OTP. Please try again.");
      });
  };

  const verifyOtp = () => {
    if (inputOtp === otp) {
      setIsVerified(true);
      setShowModal(false);
      setError(""); // Clear any previous error messages
    } else {
      setError("Invalid OTP. Please enter the valid Otp");
    }
  };
  const editEmail = () => {
    setShowModal(false);
  };
  const resendOtp = () => {
    setOtp("");
    setInputOtp("");
    generateOtp();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <ToastContainer />
    <div className="flex flex-col md:flex-row bg-white p-8 rounded shadow-md w-full max-w-4xl animate-fade-in">
      <div className="md:w-2/3 pr-8">
        <img
          src={signupbg}
          alt="Background"
          className="rounded-md w-full h-full object-cover shadow-md"
        />
      </div>
      <div className="md:w-1/2 mt-8 md:mt-0 ml-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>
        {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200 transition duration-300"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 mb-2">
              Phone Number
            </label>
            <div className="flex items-center">
              <div style={{ width: "100%" }}>
                <PhoneInput
                  country={"in"}
                  value={phone}
                  onChange={setPhone}
                  inputProps={{
                    name: "phone",
                    required: true,
                    autoFocus: true,
                  }}
                  inputStyle={{ width: "100%" }}
                  containerStyle={{ width: "100%" }}
                />
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200 transition duration-300"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email Address
            </label>
            <div className="flex items-center">
              <input
                type="email"
                id="email"
                className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200 transition duration-300 mr-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="button"
                className={`w-full py-2 rounded focus:outline-none focus:ring transition duration-300 ${
                  isVerified ? "bg-green-500" : "bg-blue-500 hover:bg-blue-600"
                } text-white`}
                onClick={generateOtp}
              >
                {isVerified ? "Verified" : "Verify"}
              </button>
            </div>
          </div>
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
              <div className="bg-white p-4 md:p-8 rounded shadow-md max-w-md w-full">
                <h2 className="text-lg md:text-xl font-bold mb-4 text-center">
                  Enter OTP
                </h2>
                {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
                <div className="mb-4">
                  <label htmlFor="otp" className="block text-gray-700 mb-2">
                    OTP
                  </label>
                  <p className="pb-3 text-red-700">{email}</p>
                  <input
                    type="text"
                    id="otp"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200 transition duration-300"
                    value={inputOtp}
                    onChange={(e) => setInputOtp(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col md:flex-row justify-center md:justify-between items-center space-y-2 md:space-y-0 md:space-x-4">
                  <button
                    type="button"
                    className="w-full md:w-auto bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-200 transition duration-300"
                    onClick={verifyOtp}
                  >
                    Verify
                  </button>
                  <button
                    type="button"
                    className="w-full md:w-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200 transition duration-300"
                    onClick={resendOtp}
                  >
                    Resend OTP
                  </button>
                  <button
                    type="button"
                    className="w-full md:w-auto bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring focus:ring-blue-200 transition duration-300"
                    onClick={editEmail}
                  >
                    Edit email
                  </button>
                </div>
              </div>
            </div>
          )}
          
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200 transition duration-300"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <div className="mt-1 flex items-center justify-between">
              <span className="text-sm px-2 text-red-700">{passwordStrength}</span>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200 transition duration-300"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
              type="submit"
              className={`w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 rounded shadow-md transform hover:scale-105 focus:outline-none focus:ring focus:ring-blue-200 transition duration-300 ${
                isVerified ? "" : "opacity-50 cursor-not-allowed"
              }`}
              disabled={!isVerified}
            >
              Sign Up
            </button>
        </form>
        {/* Login Link */}
        <div className="mt-4 text-center">
          <span className="text-gray-600">Already have an account? </span>
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Signup;

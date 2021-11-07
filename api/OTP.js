// Imports
import apiClient from "./client";

// OTP Endpoints
const optVerify = "/otp/verify-otp";

// API functions
const VerifyOTP = (DATA) => apiClient.post(optVerify, DATA);

// Exports
export default {
  VerifyOTP,
};

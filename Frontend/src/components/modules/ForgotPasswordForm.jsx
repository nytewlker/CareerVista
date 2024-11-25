import React, { useState } from "react";
import axios from "axios";
import { APIBASEURL } from "../../config"; // Your API base URL
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("employee");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [resetLink, setResetLink] = useState(""); // State for the reset link

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Log the email and role before making the API call
    console.log("Submitting Forgot Password request:", { email, role });

    try {
      const response = await axios.post(`${APIBASEURL}/auth/forgot-password`, {
        email,
        role,
      });

      // Log the response to see what is returned from the server
      console.log("Response:", response.data);

      setMessage(response.data.msg);
      setResetLink(`/reset-password/${role}/${response.data.token}`); // Set the reset link
      setError("");
    } catch (error) {
      // Log the error to debug if something goes wrong
      console.log("Error:", error.response?.data || error);

      setError(error.response?.data?.msg || "An error occurred");
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen py-16 flex items-center justify-center ">
      <div className="max-w-md w-full bg-black bg-opacity-50 shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4 text-center">
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {message && (
            <div className="bg-green-100 text-green-700 border border-green-400 rounded-md p-2 text-sm">
              {message}
            </div>
          )}
          {error && (
            <div className="bg-red-100 text-red-700 border border-red-400 rounded-md p-2 text-sm">
              {error}
            </div>
          )}

          {/* Role Selector */}
          <div>
            <label className="block text-white mb-2">Select Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2 rounded "
            >
              <option value="employee">Employee</option>
              <option value="recruiter">Recruiter</option>
            </select>
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-white">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 rounded "
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-yellow-400 text-white font-semibold rounded-md hover:bg-yellow-500 transition-colors duration-300"
          >
            Send Reset Link
          </button>
        </form>

        {/* Reset Link */}
        {resetLink && (
          <p className="mt-4 text-center text-sm text-gray-300">
            <Link
              to={resetLink}
              className="text-yellow-400 hover:text-yellow-500 transition-colors duration-300"
            >
              Click here to reset your password
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { APIBASEURL } from "../../config";

const LoginForm = () => {
  const [role, setRole] = useState("employee");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRoleChange = (e) => setRole(e.target.value);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${APIBASEURL}/${role}/login`, formData);
      console.log("Login successful:", response.data);

      // Store user details in local storage
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate(role === "recruiter" ? "/recruiterhome" : "/employeehome");
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md p-6 bg-black bg-opacity-50 backdrop-blur-sm rounded-lg shadow-xl">
        <h2 className="text-center text-3xl font-semibold text-yellow-400 mb-4">
          Welcome Back!
        </h2>
        <p className="text-center text-gray-300 mb-6">
          Sign in to your account
        </p>

        {/* Display Error */}
        {error && (
          <div className="mb-4 text-sm text-red-500 bg-red-100 bg-opacity-20 border border-red-500 rounded-md px-4 py-2">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Role Selector */}
          <div>
            <label className=" text-sm  font-medium">Role</label>
            <select
              value={role}
              onChange={handleRoleChange}
              className="w-full mt-1 px-4 py-2   rounded-md focus:ring-yellow-500 focus:border-yellow-500"
            >
              <option value="employee"  >Employee</option>
              <option value="recruiter">Recruiter</option>
            </select>
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium bg-transparent ">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium  ">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 rounded-md  focus:ring-yellow-500 focus:border-yellow-500"
              placeholder="Enter your password"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full px-4 py-2  bg-yellow-500 hover:bg-yellow-600 font-semibold rounded-md shadow-md transition-all duration-300"
          >
            Login
          </button>
        </form>

        {/* Forgot Password Link */}
        <div className="mt-4 flex justify-between">
  <Link
    to="/forgot-password"
    className="text-sm text-yellow-400 hover:text-yellow-500 transition-all duration-300"
  >
    Forgot Password?
  </Link>
  <Link
    to="/RegistrationForm"
    className="text-sm text-yellow-400 hover:text-yellow-500 transition-all duration-300"
  >
    Create Account
  </Link>
</div>

      </div>
    </div>
  );
};

export default LoginForm;

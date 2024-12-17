import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { APIBASEURL } from "../../config"; // Your API base URL


const ResetPasswordForm = () => {
  const { token, role } = useParams(); // Extract token and role from URL params
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password confirmation
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post(
        `${APIBASEURL}/auth/reset-password/${role}/${token}`,
        { password }
      );
      setMessage(response.data.msg);
      setError('');
    } catch (err) {
      setError(err.response?.data?.msg || 'An error occurred. Please try again.');
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-6 bg-black bg-opacity-50 rounded-lg shadow-lg">
        <h2 className="text-center text-2xl font-bold text-yellow-500 mb-4">
          Reset Password
        </h2>
        {message && (
          <div className="text-center text-green-400 bg-green-900 bg-opacity-50 border border-green-500 rounded px-4 py-3 mb-4">
            {message}
          </div>
        )}
        {error && (
          <div className="text-center text-red-400 bg-red-900 bg-opacity-50 border border-red-500 rounded px-4 py-3 mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium  mb-1">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2  rounded "
            />
          </div>
          <div>
            <label className="block text-sm font-medium  mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-3 py-2 rounded "
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2  bg-yellow-500 hover:bg-yellow-600 font-semibold rounded-md shadow"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;

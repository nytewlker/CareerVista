import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Settings = () => {
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:5000/api/admin/change-password`, {
        email,
        oldPassword,
        newPassword,
      });

      if (response.status === 200) {
        alert('Password changed successfully');
      }
    } catch (error) {
      console.error(error.response?.data?.msg || 'Error changing password');
      alert(error.response?.data?.msg || 'Error changing password');
    }
  };

  return (
    <div className="settings">
      <h2 className="text-center mt-5">Change Password</h2>
      <form onSubmit={handleSubmit} className="col-md-6 offset-md-3">
        <div className="form-group mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Old Password</label>
          <input
            type="password"
            className="form-control"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>New Password</label>
          <input
            type="password"
            className="form-control"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Change Password</button>
      </form>
    </div>
  );
};

export default Settings;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { APIBASEURL } from '../../config';

const RegistrationForm = () => {
  const [role, setRole] = useState('employee');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    companyName: '',
    bio: '',
    institutionName: '',
    startYear: '',
    endYear: '',
    skills: '',
    resume: null,
    profilePic: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
    setError(''); // Clear error when user makes changes
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return false;
    }
    if (!formData.email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    return true;
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await axios.post(`${APIBASEURL}/${role}/register`, formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate(role === 'recruiter' ? '/recruiterhome' : '/employeehome');
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16 flex justify-center items-center">
      <div className="w-full max-w-4xl shadow-lg rounded-3xl  overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Section */}
          <div className="hidden md:flex flex-col items-center justify-center bg-black p-6">
            <h2 className="text-center text-yellow-500 font-bold text-3xl">Welcome to CareerVista!</h2>
            <p className="text-center mt-4 text-gray-300">
              Embark on your professional journey with CareerVista. Connect with top companies and unlock exciting opportunities.
            </p>
            <img
              src={`${process.env.PUBLIC_URL}/assets/rr.gif`}
              alt="CareerVista Welcome"
              className="w-3/4 rounded-lg mt-6 animate-pulse"
            />
          </div>

          {/* Right Section */}
          <div className="p-6 bg-black bg-opacity-50 ">
            <h3 className="text-center mb-4 text-yellow-500 font-bold text-2xl">Create Your Account</h3>
            {error && <p className="bg-red-500 text-white text-center p-2 rounded-md mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Role Selector */}
              <div>
                <label className="block text-white">Role</label>
                <select
                  value={role}
                  onChange={handleRoleChange}
                  className="w-full mt-2  rounded-md p-2 "
                >
                  <option value="employee">Employee</option>
                  <option value="recruiter">Recruiter</option>
                </select>
              </div>
              {/* Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white">Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full  rounded-md p-2 "
                  />
                </div>
                <div>
                  <label className="block text-white">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-md p-2 "
                  />
                </div>
              </div>
              {/* Password */}
              <div>
                <label className="block text-white ">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-md p-2 "
                />
              </div>
              {/* Conditional Fields */}
              {role === 'recruiter' && (
                <div>
                  <label className="block text-white ">Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    placeholder="Enter your company name"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full  rounded-md p-2 "
                  />
                =
                <label className="block text-white ">Bio</label>
                <input
                  type="text"
                  name="bio"
                  placeholder="Enter your company name"
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full  rounded-md p-2 "
                />
              </div>
              )}
              {role === 'employee' && (
                <>
                  <div>
                    <label className="block text-white">Institution Name</label>
                    <input
                      type="text"
                      name="institutionName"
                      placeholder="Enter your institution name"
                      value={formData.institutionName}
                      onChange={handleChange}
                      className="w-full  rounded-md p-2 "
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white ">Start Year</label>
                      <input
                        type="number"
                        name="startYear"
                        placeholder="Start Year"
                        value={formData.startYear}
                        onChange={handleChange}
                        className="w-full  rounded-md p-2 "
                      />
                    </div>
                    <div>
                      <label className="block text-white">End Year</label>
                      <input
                        type="number"
                        name="endYear"
                        placeholder="End Year"
                        value={formData.endYear}
                        onChange={handleChange}
                        className="w-full rounded-md p-2"
                      />
                    </div>
                  </div>
                  {/* File Uploads */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white ">Upload Resume</label>
                  <input
                    type="file"
                    name="resume"
                    onChange={handleChange}
                    className="w-full text-white rounded  outline"
                    accept="application/pdf"
                  />
                </div>
                <div>
                  <label className="block text-white ">Profile Picture</label>
                  <input
                    type="file"
                    name="profilePic"
                    onChange={handleChange}
                    className="w-full text-white outline rounded "
                    accept="image/*"
                  />
                </div>
              </div>
                </>
              )}
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-yellow-500 text-white  font-bold py-2 rounded-md hover:bg-yellow-600 transition-all duration-300"
                disabled={loading}
              >
                {loading ? 'Registering...' : 'Create Account'}
              </button>
              <p className="text-center text-gray-300 mt-3">
                Already have an account?{' '}
                <span
                  onClick={() => navigate('/LoginForm')}
                  className="text-yellow-500 hover:text-yellow-400 cursor-pointer"
                >
                  Login here
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;

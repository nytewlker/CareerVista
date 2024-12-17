import React, { useState, useEffect } from "react";
import axios from "axios";

import { APIBASEURL } from "../../../config/index";

const RecruiterProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    companyName: "",
    bio: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRecruiterProfile();
  }, []);

  const fetchRecruiterProfile = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      setError("User not logged in");
      return;
    }

    try {
      const response = await axios.get(
        `${APIBASEURL}/recruiter/profile/${user._id}`
      );
      setFormData(response.data);
    } catch (error) {
      console.error("Error fetching recruiter profile:", error.message);
      setError("Failed to fetch profile data");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      setError("User not logged in");
      return;
    }

    try {
      const response = await axios.put(
        `${APIBASEURL}/recruiter/profile/${user._id}`,
        formData
      );
      console.log("Recruiter profile updated successfully:", response.data);

      setError(null);
    } catch (error) {
      console.error("Error updating recruiter profile:", error.message);
      setError("Failed to update profile");
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl text-center font-bold mb-6 text-yellow-500">
          Recruiter Profile
        </h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="max-w-3xl mx-auto bg-black bg-opacity-50 backdrop:blur-sm rounded-lg shadow-lg p-8">

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <input
                type="tel"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Company Name"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Bio"
              rows="4"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-600  py-2 px-4 rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecruiterProfile;

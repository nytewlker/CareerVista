import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { APIBASEURL } from "../../../config/index.js";

const AddJobs = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    jobType: "",
    salary: "",
    experience: ""
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));

    try {
      const response = await axios.post(`${APIBASEURL}/job`, {
        ...formData,
        recruiterId: user._id,
        company: user.companyName
      });
      alert("Job posted successfully!", response.data);
      setFormData({ title: "", description: "", location: "", jobType: "", salary: "", experience: "" });
      navigate("/recruiterHome");
    } catch (error) {
      console.error("Error posting job:", error);
    }
  };

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-yellow-500">Post a Job</h2>
        </div>
        
        <div className="bg-black bg-opacity-50 backdrop:blur-sm rounded-lg shadow-md p-6 ">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium ">Job Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 block w-full rounded-md  shadow-sm focus:yellow-yellow-500 focus:ring-yellow-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium ">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md  p-2 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium ">Job Description</label>
              <textarea
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md p-2 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm  font-medium ">Job Type</label>
                <select
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md p-2 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                >
                  <option value="">Select Job Type</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium ">Salary</label>
                <input
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md p-2 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium ">Required Experience</label>
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md p-2 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-600  py-2 px-4 rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Post Job
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddJobs;
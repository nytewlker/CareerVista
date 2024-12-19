import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { APIBASEURL } from "../../../config/index.js";

const UpdateJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState({
    title: "",
    description: "",
    location: "",
    jobType: "",
    salary: "",
    experience: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`${APIBASEURL}/job/${jobId}`);
        setJob(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching job details:", error);
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${APIBASEURL}/job/${jobId}`, job);
      navigate("/myjobs");
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto  px-4 py-8 flex justify-center items-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-yellow-500">Update Job</h2>
        </div>
        <div className="bg-black bg-opacity-50 backdrop:blur-sm rounded-lg shadow-md p-6 ">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
              <label className="block text-sm font-medium ">Job Title</label>

                <input
                  type="text"
                  name="title"
                  value={job.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium  mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={job.location}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium  mb-2">
                Job Description
              </label>
              <textarea
                rows={4}
                name="description"
                value={job.description}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium  mb-2">
                  Job Type
                </label>
                <select
                  name="jobType"
                  value={job.jobType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 text-black border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                >
                  <option value="">Select Job Type</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium  mb-2">
                  Salary
                </label>
                <input
                  type="text"
                  name="salary"
                  value={job.salary}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium  mb-2">
                Required Experience
              </label>
              <input
                type="text"
                name="experience"
                value={job.experience}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-600 text-black  py-3 px-4 rounded-md hover:bg-yellow-700 transition-colors duration-300 font-medium"
            >
              Update Job
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateJob;
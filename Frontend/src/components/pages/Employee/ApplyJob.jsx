import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { APIBASEURL } from "../../../config";

const ApplyJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    coverLetter: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user._id) {
        alert("User is not logged in or employeeId is missing.");
        return;
      }

      await axios.post(`${APIBASEURL}/application/apply`, {
        jobId,
        employeeId: user._id,
        coverLetter: formData.coverLetter,
      });

      alert("Application submitted successfully!");
      navigate("/employeeHome");
    } catch (error) {
      console.error("Error applying for job:", error);
      alert("Failed to submit the application. Please try again.");
    }
  };

  return (
    <div className="min-h-screen  py-16 px-4 sm:px-6 text-white lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold  sm:text-4xl">
            Apply for Position
          </h2>
          <p className="mt-4 text-lg text-gray-200">
            Make your application stand out with a compelling cover letter
          </p>
        </div>

        <div className="mt-12 bg-black bg-opacity-50 backdrop:blur-sm py-8 px-6 shadow rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="coverLetter"
                className="block text-sm font-medium text-gray-200"
              >
                Cover Letter
              </label>
              <div className="mt-1">
                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  rows="10"
                  className="appearance-none block w-full px-3 py-2 border bg-transparent border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Tell us why you're the perfect fit for this position..."
                  value={formData.coverLetter}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="mr-4 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-yellow-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyJob;
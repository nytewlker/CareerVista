import React, { useEffect, useState } from "react";
import axios from "axios";
import { APIBASEURL } from "../../../config/index.js";
import JobApplicationsList from "./JobApplicationList.jsx";
import { useNavigate } from "react-router-dom";

const MyJobs = () => {
  const [postedJobs, setPostedJobs] = useState([]);
  const [user, setUser] = useState(null);
  const [expandedJobId, setExpandedJobId] = useState(null);
  const [expandedAppId, setExpandedAppId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing stored user:", error);
      }
    }
  }, []);

  useEffect(() => {
    const fetchPostedJobs = async () => {
      try {
        if (user && user._id) {
          const response = await axios.get(`${APIBASEURL}/job/${user._id}`);
          setPostedJobs(response.data);
        }
      } catch (error) {
        console.error("Error fetching posted jobs:", error);
      }
    };

    fetchPostedJobs();
  }, [user]);

  const handleUpdateJob = (jobId) => {
    console.log(`Navigating to update job with ID: ${jobId}`);
    navigate(`/updatejob/${jobId}`);
  };

  const handleDeleteJob = async (jobId) => {
    try {
      const response = await axios.delete(`${APIBASEURL}/job/${jobId}`);
      console.log("Job deleted:", response.data);
      setPostedJobs(postedJobs.filter((job) => job._id !== jobId));
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const toggleJobApplications = (jobId) => {
    if (expandedJobId === jobId) {
      setExpandedJobId(null);
    } else {
      setExpandedJobId(jobId);
    }
  };

  const handleViewApplications = (jobId) => {
    if (expandedAppId === jobId) {
      setExpandedAppId(null);
    } else {
      setExpandedAppId(jobId);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-center text-yellow-500 mb-10">
        Recruiter Dashboard
      </h1>
      
      <div className="space-y-6">
        {postedJobs.length > 0 ? (
          postedJobs.map((job) => (
            <div
              key={job._id}
              className="bg-black bg-opacity-50 backdrop:blur-sm rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-semibold ">
                    {job.title}
                  </h2>
                  <p className=" mt-2">{job.description}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdateJob(job._id)}
                    className="px-4 py-2 bg-yellow-400  rounded-md hover:bg-yellow-700 transition-colors"
                  >
                    Update Job
                  </button>
                  <button
                    onClick={() => handleDeleteJob(job._id)}
                    className="px-4 py-2 bg-red-600  rounded-md hover:bg-red-700 transition-colors"
                  >
                    Delete Job
                  </button>
                </div>
              </div>

              <div className="flex gap-4 mb-4">
                <button
                  onClick={() => toggleJobApplications(job._id)}
                  className="px-4 py-2   border rounded-md "
                >
                  {expandedJobId === job._id ? "Hide Details" : "View More"}
                </button>
                <button
                  onClick={() => handleViewApplications(job._id)}
                  className="px-4 py-2 bg-green-600  rounded-md hover:bg-green-700 transition-colors"
                >
                  View Applications
                </button>
              </div>

              {expandedJobId === job._id && (
                <div className="grid grid-cols-2  bg-white bg-opacity-10 gap-4 mt-4  p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Experience:</span>
                    <span>{job.experience}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Company:</span>
                    <span >{job.company}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Location:</span>
                    <span >{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Job Type:</span>
                    <span>{job.jobType}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Salary:</span>
                    <span>{job.salary}</span>
                  </div>
                </div>
              )}

              {expandedAppId === job._id && (
                <div className="mt-6 border-t pt-4">
                  <JobApplicationsList jobId={job._id} />
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-16">
            <p className="text-xl ">No jobs posted yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyJobs;